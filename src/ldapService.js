const ldap = require('ldapjs');
const tls = require('tls');

class LdapService {
    async testConnection(config) {
        return new Promise((resolve, reject) => {
            console.log('Attempting to connect with config:', {
                url: config.ldapUri,
                bindDn: config.bindDn,
                timeout: config.timeout,
                useTLS: config.useTLS,
                useSSL: config.useSSL
            });

            let client;
            try {
                client = this.createClient(config);

                client.on('error', (err) => {
                    console.error('LDAP client error:', err);
                    reject(new Error(`LDAP client error: ${err.message}`));
                });

                // Force TLS for FreeIPA
                if (config.useTLS) {
                    const tlsOptions = {
                        rejectUnauthorized: !config.allowInsecure,
                        secureContext: tls.createSecureContext({
                            minVersion: 'TLSv1.2'
                        })
                    };

                    client.starttls(tlsOptions, (err) => {
                        if (err) {
                            console.error('StartTLS error:', err);
                            client.destroy();
                            reject(new Error(`StartTLS failed: ${err.message}`));
                            return;
                        }

                        this.performBind(client, config.bindDn, config.bindPassword)
                            .then(resolve)
                            .catch(reject);
                    });
                } else {
                    this.performBind(client, config.bindDn, config.bindPassword)
                        .then(resolve)
                        .catch(reject);
                }
            } catch (error) {
                console.error('Connection error:', error);
                if (client) client.destroy();
                reject(new Error(`Connection failed: ${error.message}`));
            }
        });
    }

    async performBind(client, bindDn, bindPassword) {
        return new Promise((resolve, reject) => {
            client.bind(bindDn, bindPassword, (err) => {
                if (err) {
                    console.error('Bind error:', err);
                    client.destroy();
                    reject(new Error(`Bind failed: ${err.message}`));
                    return;
                }

                console.log('Bind successful');
                client.destroy();
                resolve(true);
            });
        });
    }

    createClient(config) {
        const clientOptions = {
            url: config.ldapUri,
            timeout: (parseInt(config.timeout) || 30) * 1000,
            connectTimeout: 10000,
            tlsOptions: {
                rejectUnauthorized: !config.allowInsecure
            }
        };

        console.log('Creating LDAP client with options:', {
            ...clientOptions,
            tlsOptions: {
                rejectUnauthorized: !config.allowInsecure
            }
        });

        return ldap.createClient(clientOptions);
    }

    async searchUser(params) {
        return new Promise((resolve, reject) => {
            const client = this.createClient(params);
            
            client.bind(params.bindDn, params.bindPassword, (err) => {
                if (err) {
                    client.destroy();
                    reject(err);
                    return;
                }

                const opts = {
                    filter: `(uid=${params.username})`,
                    scope: 'sub',
                    attributes: ['uid', 'cn', 'sn', 'mail', 'objectClass', 'ou']
                };

                const searchBase = 'dc=example,dc=com';

                console.log('Searching with options:', {
                    searchBase,
                    filter: opts.filter,
                    scope: opts.scope,
                    attributes: opts.attributes
                });

                client.search(searchBase, opts, (err, res) => {
                    if (err) {
                        console.error('Search error:', err);
                        client.destroy();
                        reject(err);
                        return;
                    }

                    let userData = null;

                    res.on('searchEntry', (entry) => {
                        console.log('Processing search entry');
                        
                        userData = {};
                        entry.attributes.forEach(attr => {
                            const attrName = attr.type;
                            const values = attr.values;
                            userData[attrName] = values.length === 1 ? values[0] : values;
                        });

                        console.log('Processed user data:', userData);
                    });

                    res.on('error', (err) => {
                        console.error('Search result error:', err);
                        client.destroy();
                        reject(err);
                    });

                    res.on('end', (result) => {
                        client.destroy();
                        if (!userData) {
                            console.log('Search completed but no user found');
                            reject(new Error('User not found'));
                            return;
                        }
                        resolve(userData);
                    });
                });
            });
        });
    }
}

module.exports = new LdapService(); 
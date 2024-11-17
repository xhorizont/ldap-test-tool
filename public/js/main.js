document.addEventListener('DOMContentLoaded', function() {
    // Theme handling
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        icon.className = theme === 'dark' 
            ? 'bi bi-sun-fill' 
            : 'bi bi-moon-stars';
    }

    // Help system
    const helpData = {
        ldapUri: {
            title: 'LDAP Server URI',
            icon: 'bi-hdd-network',
            content: `
                <p>The URI (Uniform Resource Identifier) for your LDAP server.</p>
                <strong>Format:</strong>
                <ul>
                    <li>Standard LDAP: <code>ldap://server:389</code></li>
                    <li>LDAP over SSL: <code>ldaps://server:636</code></li>
                </ul>
                <p><strong>Examples:</strong></p>
                <ul>
                    <li>ldap://ldap.example.com:389</li>
                    <li>ldaps://secure-ldap.example.com:636</li>
                </ul>
            `
        },
        bindDn: {
            title: 'Bind DN',
            icon: 'bi-person-badge',
            content: `
                <p>The Distinguished Name (DN) used to bind to the LDAP server.</p>
                <strong>Common formats:</strong>
                <ul>
                    <li>Active Directory: <code>CN=user,CN=Users,DC=domain,DC=com</code></li>
                    <li>OpenLDAP: <code>uid=user,ou=people,dc=example,dc=com</code></li>
                    <li>FreeIPA: <code>uid=admin,cn=users,cn=accounts,dc=example,dc=com</code></li>
                </ul>
            `
        },
        bindPassword: {
            title: 'Bind Password',
            icon: 'bi-key',
            content: `
                <p>The password used to authenticate with the LDAP server.</p>
                <ul>
                    <li>This is the password associated with the Bind DN</li>
                    <li>The connection will be encrypted if using LDAPS or StartTLS</li>
                    <li>For anonymous binding, leave this field empty</li>
                </ul>
            `
        },
        protocol: {
            title: 'LDAP Protocol Version',
            icon: 'bi-gear',
            content: `
                <p>The LDAP protocol version to use for the connection.</p>
                <ul>
                    <li><strong>Version 3:</strong> Modern LDAP servers (recommended)</li>
                    <li><strong>Version 2:</strong> Legacy systems only</li>
                </ul>
            `
        },
        timeout: {
            title: 'Connection Timeout',
            icon: 'bi-clock',
            content: `
                <p>Maximum time to wait for server operations in seconds.</p>
                <ul>
                    <li>Default: 30 seconds</li>
                    <li>Increase for slow networks or large queries</li>
                    <li>Decrease for faster failure detection</li>
                </ul>
            `
        },
        baseDN: {
            title: 'Base DN',
            icon: 'bi-diagram-3',
            content: `
                <p>The starting point in the LDAP tree for searches.</p>
                <strong>Common formats:</strong>
                <ul>
                    <li>Active Directory: <code>DC=domain,DC=com</code></li>
                    <li>OpenLDAP: <code>dc=example,dc=com</code></li>
                    <li>Specific OU: <code>ou=people,dc=example,dc=com</code></li>
                </ul>
            `
        },
        serverType: {
            title: 'LDAP Server Type',
            icon: 'bi-server',
            content: `
                <p>The type of LDAP server you're connecting to.</p>
                <ul>
                    <li><strong>Active Directory:</strong> Microsoft's directory service</li>
                    <li><strong>OpenLDAP:</strong> Open-source LDAP implementation</li>
                    <li><strong>FreeIPA:</strong> Red Hat's identity management</li>
                    <li><strong>389DS:</strong> Enterprise-grade directory server</li>
                </ul>
            `
        },
        searchScope: {
            title: 'Search Scope',
            icon: 'bi-search',
            content: `
                <p>Determines how deep in the LDAP tree to search.</p>
                <ul>
                    <li><strong>Subtree:</strong> Search the base DN and all entries below it</li>
                    <li><strong>One Level:</strong> Search only immediate children of base DN</li>
                    <li><strong>Base:</strong> Search only the base DN entry itself</li>
                </ul>
            `
        },
        referrals: {
            title: 'Referral Handling',
            icon: 'bi-signpost-split',
            content: `
                <p>How to handle LDAP referrals to other servers.</p>
                <ul>
                    <li><strong>Follow:</strong> Automatically follow referrals</li>
                    <li><strong>Ignore:</strong> Skip referral entries</li>
                    <li><strong>Throw:</strong> Generate an error on referrals</li>
                </ul>
            `
        },
        sizeLimit: {
            title: 'Size Limit',
            icon: 'bi-list-ol',
            content: `
                <p>Maximum number of entries to return in search results.</p>
                <ul>
                    <li>Default: 1000 entries</li>
                    <li>0 means no limit (server limits may still apply)</li>
                    <li>Higher values may impact performance</li>
                </ul>
            `
        },
        derefAliases: {
            title: 'Dereference Aliases',
            icon: 'bi-link',
            content: `
                <p>How to handle LDAP alias entries during search.</p>
                <ul>
                    <li><strong>Always:</strong> Always dereference aliases</li>
                    <li><strong>Finding:</strong> Dereference when finding the base</li>
                    <li><strong>Searching:</strong> Dereference when searching</li>
                    <li><strong>Never:</strong> Don't dereference aliases</li>
                </ul>
            `
        },
        useKerberos: {
            title: 'Kerberos Authentication',
            icon: 'bi-shield-lock',
            content: `
                <p>Enable Kerberos/GSSAPI authentication.</p>
                <ul>
                    <li>Used for single sign-on in Windows domains</li>
                    <li>Requires proper Kerberos configuration</li>
                    <li>Common in Active Directory environments</li>
                </ul>
            `
        },
        useSasl: {
            title: 'SASL Authentication',
            icon: 'bi-shield-check',
            content: `
                <p>Enable SASL (Simple Authentication and Security Layer).</p>
                <ul>
                    <li>Provides additional authentication mechanisms</li>
                    <li>Includes DIGEST-MD5, EXTERNAL, etc.</li>
                    <li>More secure than simple bind</li>
                </ul>
            `
        }
    };

    // Help popup handling
    const helpIcons = document.querySelectorAll('.help-icon');
    const helpPopup = document.getElementById('helpPopup');
    const closeHelp = document.getElementById('closeHelp');
    const helpTitle = helpPopup.querySelector('.help-title');
    const helpBody = helpPopup.querySelector('.help-body');

    helpIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            const fieldName = e.target.dataset.field;
            const helpInfo = helpData[fieldName];
            
            if (helpInfo) {
                helpTitle.textContent = helpInfo.title;
                helpBody.innerHTML = helpInfo.content;
                helpPopup.style.display = 'block';
            }
        });
    });

    closeHelp.addEventListener('click', () => {
        helpPopup.style.display = 'none';
    });

    helpPopup.addEventListener('click', (e) => {
        if (e.target === helpPopup) {
            helpPopup.style.display = 'none';
        }
    });

    const ldapForm = document.getElementById('ldapForm');
    const prefillButton = document.getElementById('prefillTestServer');
    const connectionStatus = document.getElementById('connectionStatus');
    const userSearchForm = document.getElementById('userSearchForm');
    const resultsTable = document.getElementById('resultsTable');
    const searchUserBtn = document.getElementById('searchUser');

    prefillButton.addEventListener('click', function() {
        document.getElementById('ldapUri').value = 'ldap://ldap.forumsys.com:389';
        document.getElementById('bindDn').value = 'cn=read-only-admin,dc=example,dc=com';
        document.getElementById('bindPassword').value = 'password';
        document.getElementById('baseDN').value = 'dc=example,dc=com';
        document.getElementById('protocol').value = '3';
        document.getElementById('timeout').value = '30';
        
        document.getElementById('useTLS').checked = false;
        document.getElementById('useSSL').checked = false;
        document.getElementById('allowInsecure').checked = false;

        const helpText = document.createElement('div');
        helpText.className = 'alert alert-info mt-3';
        helpText.innerHTML = `
            <h6>Available Test Users:</h6>
            <p class="mb-2">Scientists Group (ou=scientists,dc=example,dc=com):</p>
            <ul class="mb-2">
                <li>einstein</li>
                <li>newton</li>
                <li>galieleo</li>
                <li>tesla</li>
            </ul>
            <p class="mb-2">Mathematicians Group (ou=mathematicians,dc=example,dc=com):</p>
            <ul class="mb-2">
                <li>riemann</li>
                <li>gauss</li>
                <li>euler</li>
                <li>euclid</li>
            </ul>
            <p class="mb-0"><small>All user passwords are "password"</small></p>
        `;

        const existingHelp = document.getElementById('testServerHelp');
        if (existingHelp) {
            existingHelp.remove();
        }

        helpText.id = 'testServerHelp';
        ldapForm.insertBefore(helpText, document.getElementById('testConnection').parentNode);
    });

    ldapForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            ldapUri: document.getElementById('ldapUri').value,
            bindDn: document.getElementById('bindDn').value,
            bindPassword: document.getElementById('bindPassword').value,
            protocol: document.getElementById('protocol').value,
            timeout: document.getElementById('timeout').value,
            useTLS: document.getElementById('useTLS').checked,
            useSSL: document.getElementById('useSSL').checked,
            allowInsecure: document.getElementById('allowInsecure').checked,
            baseDN: document.getElementById('baseDN').value
        };

        try {
            const response = await fetch('/api/test-connection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            
            connectionStatus.style.display = 'block';
            const alert = connectionStatus.querySelector('.alert');
            
            if (result.success) {
                alert.className = 'alert alert-success';
                alert.textContent = 'Connection successful!';
                userSearchForm.style.display = 'block';
            } else {
                alert.className = 'alert alert-danger';
                alert.textContent = `Connection failed: ${result.message}`;
                userSearchForm.style.display = 'none';
                resultsTable.style.display = 'none';
            }
        } catch (error) {
            connectionStatus.style.display = 'block';
            const alert = connectionStatus.querySelector('.alert');
            alert.className = 'alert alert-danger';
            alert.textContent = `Error: ${error.message}`;
        }
    });

    searchUserBtn.addEventListener('click', async function() {
        const username = document.getElementById('username').value;
        if (!username) {
            alert('Please enter a username');
            return;
        }

        const searchData = {
            username,
            ldapUri: document.getElementById('ldapUri').value,
            bindDn: document.getElementById('bindDn').value,
            bindPassword: document.getElementById('bindPassword').value,
            baseDN: document.getElementById('baseDN').value,
            allowInsecure: document.getElementById('allowInsecure').checked
        };

        try {
            const response = await fetch('/api/search-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(searchData)
            });

            const result = await response.json();
            
            if (result.success) {
                resultsTable.style.display = 'block';
                const tbody = document.getElementById('userAttributes');
                tbody.innerHTML = '';
                
                if (result.data) {
                    Object.entries(result.data).forEach(([key, value]) => {
                        if (value !== undefined && value !== null) {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td><strong>${key}</strong></td>
                                <td>${Array.isArray(value) ? value.join(', ') : value}</td>
                            `;
                            tbody.appendChild(row);
                        }
                    });
                }
            } else {
                resultsTable.style.display = 'none';
                alert(`Search failed: ${result.message}`);
            }
        } catch (error) {
            resultsTable.style.display = 'none';
            alert(`Error searching user: ${error.message}`);
        }
    });

    document.getElementById('serverType').addEventListener('change', function(e) {
        const adOptions = document.getElementById('adOptions');
        
        if (e.target.value === 'ad') {
            adOptions.classList.remove('d-none');
        } else {
            adOptions.classList.add('d-none');
        }

        switch(e.target.value) {
            case 'ad':
                document.getElementById('searchScope').value = 'sub';
                document.getElementById('referrals').value = 'follow';
                document.getElementById('protocol').value = '3';
                break;
            case 'openldap':
                document.getElementById('searchScope').value = 'sub';
                document.getElementById('referrals').value = 'ignore';
                document.getElementById('protocol').value = '3';
                break;
            case 'freeipa':
                document.getElementById('searchScope').value = 'sub';
                document.getElementById('referrals').value = 'throw';
                document.getElementById('useTLS').checked = true;
                break;
            case '389ds':
                document.getElementById('searchScope').value = 'sub';
                document.getElementById('referrals').value = 'follow';
                document.getElementById('protocol').value = '3';
                break;
        }
    });

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    document.getElementById('reportIssue').addEventListener('click', function(e) {
        e.preventDefault();
        window.open('https://github.com/yourusername/ldap-test-tool/issues/new', '_blank');
    });
});
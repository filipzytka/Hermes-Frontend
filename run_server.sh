#!/bin/bash

rm -f /var/www/html/config.js
cat << EOF > /var/www/html/config.js
window.ENV_API_BASE_URL = "$ENV_API_BASE_URL";
window.ENV_REACT_BASE_URL = "$ENV_REACT_BASE_URL";
EOF

nginx -g 'daemon off;'
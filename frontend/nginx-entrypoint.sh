#!/bin/sh

# Start the generated config file
echo "window.env = {" > /usr/share/nginx/html/env-config.js

# Find all environment variables starting with "VITE_" and add them to the file
for var in $(env | grep "VITE_"); do
  name=$(echo "$var" | cut -d "=" -f 1)
  value=$(echo "$var" | cut -d "=" -f 2-)
  echo "  $name: \"$value\"," >> /usr/share/nginx/html/env-config.js
done

# End the config file
echo "};" >> /usr/share/nginx/html/env-config.js

echo "Environment variable injection completed."
exec nginx -g 'daemon off;'

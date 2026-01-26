server {
    listen 80;
    listen              443 ssl;
    ssl_certificate     /home/abrikos/nginx-selfsigned.crt;
    ssl_certificate_key /home/abrikos/nginx-selfsigned.key;
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    server_name abrikosio.local;
    index index.html index.html;

    location / {
        keepalive_timeout 0;
        proxy_read_timeout 120s;
        proxy_pass http://127.0.0.1:9000;
        proxy_set_header Host $host;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Real-IP $remote_addr;
    }

    location ~ ^/(api|ws) {
            keepalive_timeout 0;
            access_log  off;
        proxy_read_timeout 120s;
        proxy_pass http://127.0.0.1:8000;
            proxy_set_header Host $host;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Real-IP $remote_addr;
    }

    location /static {
	autoindex on;
	sendfile on;
        root /home/abrikos/PycharmProjects/abrikosio;
	add_header Cache-Control no-cache;
	expires 1s;
    }

}

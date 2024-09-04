# How to deploy sveltekit app

## Clone site

The first thing to do is clone your project from GitHub

```bash
git clone https://github.com/USERNAME/PROJECT_SLUG.git
```

## Build site

Build site for production using `npm run build`.

## PM2

To manage our app we are going to use PM2, you can install it using `npm install pm2 -g`.

```bash
npm install pm2 -g
```

## Start app

After building app running `npm run build` it will create a folder named `build`, this folder contain `index.js` that we can use to start app.

```bash
PORT=PORT_NUMBER pm2 start build/index.js --name=appName
```

Or use `-i` to set Cluster mode and how many Cluster to start.

```bash
PORT=PORT_NUMBER pm2 start build/index.js --name=appName -i 1
```

## Add site to Nginx

Add your site to Nginx by using default text editor `nano` and adding information for your server block.

```bash
nano /etc/nginx/sites-available/mySite.com
```

And add the following Nginx server block with your site info.

```text
server {
    server_name mySite.com www.mySite.com;
    location / {
        proxy_pass http://localhost:PORT_NUMBER;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        include proxy_params;
    }
}
```

## Enabled site

Next enabled/link created server block to `/etc/nginx/sites-enabled/`.

```bash
sudo ln -s /etc/nginx/sites-available/mySite.com /etc/nginx/sites-enabled/
```

## Start Nginx

After adding site and enabling it, you need to restart your Nginx server.

```bash
sudo systemctl restart nginx
```

## End

Your site should be up and running, run `pm2 list` to see the list of sites running.

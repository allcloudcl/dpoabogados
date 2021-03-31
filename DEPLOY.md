# Rails deployment quick reference

# Specifications
* Debian based VM
* nginx as webserver
* Postgresql as RDS
* nvm to manage node versions
* rbenv to manage ruby versions
* passenger a webserver?

```
apt update && apt upgrade
```

For Rails:
```
apt install curl git nginx postgresql libpq-dev build-essential libssl-dev
libreadline-dev zlib1g-dev
```

Misc:
* `curl`:
* `git`:

rbenv:
* `build-essential`: Necessary to compile Ruby
* `libssl-dev libreadline-dev zlib1g-dev`: To compile zlib

Rails:
* `nginx`: Web Server.
* `postgresql`: RDS.
* `libpq-dev`: So Rails can compile the `pg` gem, which allows it to interact
  with Postgres.

# nvm

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

```
nvm install stable
npm install -g yarn
```

NOTE: Move the script added to the end of ~/.bashrc to the **top** of the
file. This is because when using Capistrano to deploy, the spawned shell is
non interactive, and usually .bashrc has a conditional which early-exits if
the shell is non-interactive, hence not loading nvm.

# rbenv

```
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-installer | bash
```

```
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.profile
```

Add to `~/.bashrc`:
```
# Load rbenv automatically by appending
# the following to ~/.bashrc:

eval "$(rbenv init -)"
```

Then

```
export RUBY_CONFIGURE_OPTS=--disable-install-doc
rbenv install 2.6.6
rbenv global 2.6.6
```

It is likely that you will not want Rubygems to generate local documentation
for each gem that you install, as this process can be lengthy. To disable
this, run this command:

```
echo “gem: --no-document” > ~/.gemrc
```

```
gem install bundler rails
```

# DB

```
sudo -u postgres createuser $USER
sudo -u postgres createdb $DB_NAME --owner=$USER

```

On local connections, PostgreSQL uses the peer authentication method that
obtains the client's user name from the operating system and uses it as
database user name. So if you're logged in as the app user rails-demo, you're
allowed to access the rails-demo database using the psql client.

# Instal passenger and nginx

https://www.phusionpassenger.com/library/install/nginx/install/oss/bionic/


In `/etc/nginx/conf.d/mod-http-passenger.conf`, replace the argument of
`passenger_ruby`:

```diff
-passenger_root /usr/lib/ruby/vendor_ruby/phusion_passenger/locations.ini;
+passenger_root /home/deployuser/.rbenv/shims/ruby;
```

# Create the app's directory

```sh
sudo chown deploy:deploy /var/www -R
touch /var/www/<APP_NAME>
```

## Configure Passenger to point to the app

Edit `/etc/nginx/nginx.conf`:

```diff
-user www-data;
+user deploy;
```

Set up the virtual host:

```diff
+server {
+        listen 80;
+        listen [::]:80;
+
+        server_name dpo.allcloud.cl;
+
+        root /var/www/dpo/current/public;
+        passenger_enabled on;
+
+        passenger_app_env production;
+}
```

# References
* https://www.ralfebert.de/tutorials/rails-deployment/
* https://www.phusionpassenger.com/library/install/nginx/install/oss/bionic/
* https://www.vultr.com/docs/how-to-install-and-configure-ruby-with-rbenv-rails-mariadb-nginx-ssl-and-passenger-on-ubuntu-17-04

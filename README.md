# Chile Debts

# Models

## Roles

There are two roles for now:
* Normal: A client.
* Admin/Lawyer: Works for ChileDeuda and manages Clients' contracts.

There are plans for a super_admin role. For rails_admin or something.

## Contracts

A user has many contracts, and a Contract belongs to a user.

Two types of contracts:
* Deuda: Related to debts.
* Jurídico: Penal/Familiar, etc.


# Frontend Structure

```
Index                 (packs/index)
└── App               (components/App)
    ├── Navbar        (components/Navbar)
    ├── Sidebar       (components/Sidebar)
    └── Routes        (routes/Index)
        ├── Home      (components/Home)      (path=/)
        ├── Contracts (components/Contracts) (path=/contracts)
        ├── Users     (components/Users)     (path=/users)
        ...
```

### System dependencies
* Ruby 2.6.6
* PostgreSQL 12.4
* NodeJS v14.15.0

### Configuration

Use `rbenv`. See https://github.com/rbenv/rbenv

### Database creation

```sh
sudo -u postgres createuser <DATABASE_USER>
sudo -u postgres createdb <DATABASE_NAME> --owner=<DATABASE_USER>
sudo -u postgres psql
```

Then in the Postgres CLI:

```sql
ALTER USER <DATABASE_USER> WITH PASSWORD <DATABASE_USER_PASSWORD>;
ALTER USER <DATABASE_USER> CREATEDB;
```

And finally:

```sh
rails db:create
```

### Database initialization

```sh
rails db:setup
```


* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# Protips

```
rails g scaffold_controller api/v1/Post --api --model-name=Post
```

In `app/views/api/v1/posts/{index,show}.json.jbuilder`:
```diff
-json.array! @posts, partial: "posts/post", as: :post
+json.array! @posts, partial: "api/v1/posts/post", as: :post
```

In `app/views/api/v1/posts/_post.json.jbuilder`:
```diff
-json.url post_url(post, format: :json)
+json.url api_v1_post_url(post, format: :json)
```

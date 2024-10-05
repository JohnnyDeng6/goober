# Goober

## Developers

To start, please cd into the `scripts` folder and run:

- `./install_pg_ubuntu.sh` (for Ubuntu systems)
  - or `./install_pg_macos.sh` (for MacOS systems)
- `./setup_pg.sh`

Skip the install steps if postgres is already installed and running.
The `goober` database will be created.

When changing the `setup/schema.sql` file, please run:

- `./drop_all.sh`
- `./setup_pg.sh`

Which will drop the `goober` database and set it up again.

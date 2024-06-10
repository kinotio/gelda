<p align="center">
  <img
    src="gelda.png"
    alt="Gelda"
    style="width:100%;"
  />
</p>

![build](https://github.com/kinotio/gelda/workflows/build/badge.svg)
![license](https://img.shields.io/github/license/kinotio/gelda?color=success)

<!-- ![tags](https://ghcr-badge.egpl.dev/kinotio/gelda/tags?trim=major&color=chocolate)
![latest](https://ghcr-badge.egpl.dev/kinotio/gelda/latest_tag?trim=major&label=latest&color=blueviolet)
![size](https://ghcr-badge.egpl.dev/kinotio/gelda/size?color=blue) -->

Gelda is a revolutionary AI-powered helpdesk assistant designed to provide users with an efficient and personalized support experience. 🤖

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Usage](#usage)
- [Build from source](#build-from-source)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Node.js and npm](#nodejs-and-npm)
  - [Supabase CLI](#supabase-cli)
  - [Project Dependencies](#project-dependencies)
- [Configuration](#configuration)
  - [Supabase](#supabase)
- [Setup](#setup)
  - [Running the Project](#running-the-project)
- [Commands](#commands)
  - [Development](#development)
  - [Build](#build)
  - [Testing](#testing)
  - [Supabase](#supabase-1)
- [License](#license)

## Usage

Pull directly the Gelda image from the Github Container Registry:

```sh
docker pull ghcr.io/kinotio/gelda:latest
```

And run it

```sh
docker run --name kinotio_gelda -p 3000:3000 -d ghcr.io/kinotio/gelda:latest
```

## Build from source

You can use Docker to use it as service inside a container or test it in your local machine
Clone the repository and change directory to be inside of the repository directory and run these commands

Build the Docker image with this command

```sh
docker build -t kinotio/gelda .
```

And, run it with this

```sh
docker run --name kinotio_gelda -p 3000:3000 -d kinotio/gelda
```

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

## Installation

### Node.js and npm

1. Download and install Node.js from the [official website](https://nodejs.org/en/).
2. Verify the installation by running the following commands:

   ```bash
   node -v
   npm -v
   ```

### Supabase CLI

1. Install Supabase CLI using npm:

   ```bash
   npm install -g supabase
   ```

2. Verify the installation by running:

   ```bash
   supabase --version
   ```

### Project Dependencies

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-project-name.git
   cd your-project-name
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

## Configuration

### Supabase

1. Create a new project on [Supabase](https://supabase.com/).
2. Note the `Project URL` and `anon` `Public API Key` from the Supabase dashboard.
3. Create a `.env` file in the root of the project and add the following:

   ```env
   DATABASE_URL=your-project-url
   ```

## Setup

### Running the Project

1. Start the development server:

   ```bash
   npm start
   ```

2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Commands

### Development

- **Start the development server:**

  ```bash
  npm start
  ```

### Build

- **Build the project for production:**

  ```bash
  npm run build
  ```

### Testing

- **Run tests:**

  ```bash
  npm test
  ```

### Supabase

- **Start Supabase locally:**

  ```bash
  supabase start
  ```

- **Stop Supabase locally:**

  ```bash
  supabase stop
  ```

- **Deploy Supabase project:**

  ```bash
  supabase deploy
  ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

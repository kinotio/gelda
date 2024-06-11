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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

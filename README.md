# Portalverse

Portalverse is a project developed as a base for the different brands of lottus, the development is carried out using NextJS.


# Pre requirements
For the operation of this project, the installation of the following dependencies is required.

1-  [node](https://nodejs.org/en/): we will need a version of node between version 14.6.0 to the most recent, preferably version 16 or later.
-- Installation on Windows: we will visit the [node](https://nodejs.org/en/) page and download the lts package, then we will click on the downloaded file and follow the installation steps.
-- Installation on Linux: We open a terminal and execute the following commands in order:
- **sudo apt update**
- **sudo apt install nodejs** 
- **nodejs -v**

2.-  [yarn](https://yarnpkg.com/getting-started): as the code's package manager. To install it we will execute the command:
- **npm install --global yarn**

later we will see the version that has been installed to ensure the installation:
- **yarn --version**

## Getting started

Once the dependencies are installed, we will start by cloning the project from the following link usando git clone:
-[Portalverse app](https://lottusAdmin@dev.azure.com/lottusAdmin/Portalverse/_git/PORAppPortalNextJs) 
Then we will move to the develop branch to download the latest changes using the command:
- **git checkout develop**

Once in the develop branch we will download the latest changes using the command
- **git pull**

Once we have the changes, we will create a new branch to generate our changes using the command:
- **git checkout -b [branch name]**

Now we will start the project using the command
- **yarn dev**

This will start a local server on port 3000, we will open the browser in the link [http://localhost:3000](http://localhost:3000) and we will be able to visualize the project.

## Deployment 
There are two environments for deployment
1.- Netlify: deployment environment for development team testing.
```
domain: https://portalverse-alpha.netlify.app
```

2.- Vercel: Deployment environment for consultation by the rest of the collaborators in the team.
```
domain: https://portalverse-beta.vercel.app
```

### Deployment in Netlify:
We will position ourselves in the file env.local.example and we will generate a copy of this file called env.local where we will change the domain either netlify or vercel.
Now to deploy the project we will start a terminal and position ourselves in the direction of the project and write the comand
- **yarn export**

Later we will execute the command
- **netlify deploy --prod**

### Deploy in Vercel:
We will use verecel CLI to deploy the project in a url to visualize the changes.
The first step is to install [vercel CLI](https://vercel.com/docs/cli)

#### Install vercel CLI
To install Vercel CLI via npm, in the terminal we will write the command:
- **npm i -g vercel**

Or to install it via yarn we will use the command
- **yarn global add vercel**

Later we will check the version of vercel that has been installed with the command
- **vercel --version**

We will position ourselves in the file env.local.example and we will generate a copy of this file called env.local where we will change the domain either netlify or vercel.

Now to deploy the project we will start a terminal and position ourselves in the direction of the project and write the comand
- **yarn export**

 With the export command, which will generate a folder called **out** that contains the compiled version of the project.
Then we will put the command
- **vercel**

Once this is done, we will write the command 
- **vercel --cwd out --prod**

where we will select the out folder created previously.
This command will ask us if we want to configure and deploy the project, we will say yes.
Then it will ask us in which area we want to deploy and we will select
- **portalverse-team-protonme**

It will ask us if we want to link to an existing project.
Once this process is done, the project will start deploying and it will generate the url where we can view it.

#### Lista de web elements necesarios para este sitio
- linea: UANE
- componentes:
    - [] lottus-accordion
    - [] lottus-banner-portalverse
    - [] lottus-button
    - [] lottus-card-website-portalverse
    - [] lottus-cards-outstanding-portalverse
    - [] lottus-checkbox
    - [] lottus-custom-head-portalverse
    - [] lottus-feedback
    - [] lottus-input
    - [] lottus-link
    - [] lottus-link-icons
    - [] lottus-lottie
    - [] lottus-modal
    - [] lottus-mosaic-portalverse
    - [] lottus-newbanner-portalverse
    - [] lottus-numbers-portalverse
    - [] lottus-outstanding-module-portalverse
    - [] lottus-paginator
    - [] lottus-progress-bar
    - [] lottus-promo-link-portalverse
    - [] lottus-rich-text
    - [] lottus-select
    - [] lottus-spotify

- Intructions:
    - Go to the project CampusLibraries-Virtual
    - Go to the file `projects/lottus-ui/src/lib/components/components-lottus.module.ts` and comment all not necessary imports
    - Go to the file `projects/lottus-ui/src/lib/components/index.components.ts` and comment all not necessary exports
    - Go to the file `projects/lottus-ui/src/lib/lottus-ui.module.ts`and comment not necessary import
    - Go to the file `projects/lottus-ui/src/public-api.ts` and comment all not necessary exports
    - Run `ng build lottus-ui` to create a new build with only necessary elements to portalverse
    * With all this configurations we get a bundle more lightweight and only contains all necessary to the project
    - Go to the folder `projects/elements/src/app/components.ts` and comments all the imorts to show an error
    - Continue the process to create a new version a library `lottus-elements-uane`

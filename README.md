# Welcome to Embedding a Dossier using LWC

### Requirements:
As of (8/26/2020)

 1. Set up firefox as your default browser. We will be opening the salesforce developer through the terminal. There is some issues logging into the dossier after it's embedded with chrome so we will be using firefox.  
 - If you are having issues login try a different browser. The new secruity browser updates are causing some login issues so if you are having this problem try a different browser. For more details click this link: https://community.microstrategy.com/s/article/Chrome-v80-Cookie-Behavior-and-the-impact-on-MicroStrategy-Deployments?language=en_US

 2. Must use Microstrategy 2020 V2 sdk. At the time of creating this github this is the lastest release. I would recommend using the latest  MicroStrategy Version and embedding sdk
 
 3. Download SF CLI: https://developer.salesforce.com/tools/sfdxcli 
 - After installing run command `sfdx update` to confirm installation and upgrading to latest release

 4. Download VS Code editor: https://code.visualstudio.com/
 - Install Salesforce extension pack. You can use the editor of your choice but VS code has many tools to make development easier with Salesforce and lightning web components
 5. Create a salesforce developer account: [https://developer.salesforce.com/](https://developer.salesforce.com/)
 6. Create a domain. Enter my domain in the search bar in the upper left corner.
 ![alt text](images/myDomain.png?raw=true "myDomain")
 - Enter a domain name of your choice, check availability and if available register the domain. It will take some time to create the domain.
 - Type Dev Hub into the search bar in the upper left corner. In this menu there is an option `Enable Dev Hub` with a toggle button that is currently disabled. Click the toggle and enable. FYI you can not change this option
 - Once the domain is deployed go back to the My Domain setup page and login. There is a button to login on the setup page. After you login go back to the setup page and click the deploy to users button. This is a prerequesite to create aura or lightning web components.
 7. Next we will build an empty project and a scratch org. Building in LWC is similar to using github to build projects. You will write the code in your code editor and push the code to your scratch org. Once the code is pushed to your scratch org you can open your dev url and see the changes on your salesforce page. In this step we will create a blank project, link it to your developer org and create a scratch org
 - Open your terminal and run this command `sfdx force:project:create -n "{Name of your project no brackets}"` This will create a blank sdfx project in the current directory. Open the project using VS Code
 - In the terminal run this command `sfdx force:auth:web:login -a {alias of your choice no brackets} -d` This will open a web log in to your salesforce developer org. The `-a` parameter is to assign it an alias which can be anything. The `-d` parameter is to make this org your default org for this project. After running this command your default web browser will open. Login to the developer org account that you want to link to this project. Once you have logged in, grant access to the salesforce CLI and then you can close your browser. In your terminal you will see a message `Successfully authorized ...`
 - Go to the `projectName/config/project-scratch-def.json` file and add `"hasSampleData": true,` after `"features: [],`.
 - Next run this command in the root folder of your project. `sfdx force:org:create -a {alias of your choice} -d 30 -f config/project-scratch-def.json -s` The `-d` parameter will determine the number to days to keep this scratch org. In this example this scratch org will be available for 30 days. That is the maximum number to days available at this time. The `-f` parameter will define the config file location for my scratch org creation. The `-s` is to set this as the default org.
 - Run the `sfdx force:org:open` command to open the scratch org page
 8. You can't add script tags into the html file in the LWC framework. You will have to download the sdk locally on your computer and upload it into the dev org portal. Must use Microstrategy 2020 V2 sdk. At the time of creating this github this is the lastest release. I would recommend using the latest MicroStrategy Version and embedding sdk. A copy has been saved at micro/embeddinglib.js in this github page. You can also find a copy at `/opt/apache/tomcat/apache-tomcat-9.0.30/webapps/MicroStrategyLibrary/javascript/embeddinglib.js` on your windows VM using the WinSCP app.
 - Go to salesforce developer homepage and type in `Static Resources` into the search bar in the upper left hand corner. Click on static resources and on the static resource set up page click new. The new button is centered under an blue bar. Give it the name embeddinglib, choose the sdk file on your local machine, change the cache control to public and click save.
  ![alt text](images/staticResource.png?raw=true "staticResource")
 9. Create a lightning web component
 - Run `sfdx force:lightning:component:create -n dossier -d force-app/main/default/lwc --type lwc`. In that directory a new folder dossier is created with three files are created. The three files are html, js and xml files. Copy paste the `dossier.js` file in this github account into the javascript file in the component folder that you created. The only thing you need to change in this file is the url for the dossier. Change line 20 `url: "https://env-144069.customer.cloud.microstrategy.com/MicroStrategyLibrary/app/B7CA92F04B9FAE8D941C3E9B7E0CD754/12F6FA5611E9E71E1DAE0080EFD5B758/K53--K46"` to your microstrategy dossier url. Copy paste the `dossier.js-meta.xml` and `dossier.html` files as well. Replace the template files you created with the files in this github account. These lines of code below will allow you to load the sdk into this project. The rest is using the microstrategy sdk.
 > import { loadScript } from 'lightning/platformResourceLoader';
 > import embeddinglib from '@salesforce/resourceUrl/embeddinglib';
 - This code below from the js file lets you access the `dossierContainer` div. You can not use `document.selector` when accessing elements from the salesforce cards. Here is the salesforce documentation: https://developer.salesforce.com/docs/component-library/documentation/en/lwc/create_components_dom_work
 > var placeholderDiv = this.template.querySelector("div.dossierContainer");
 - This line of code in the html file will create the dossierContainer class and control the size of the component on the salesforce page.
 > <div class="dossierContainer" style="height: 800px;"></div>
 - These lines will determine what type of salesforce pages these components will be visible. This specific line states you will have access to this component on AppPage. Add or do not use as you please. 
 > <target>lightning__AppPage</target>

 10. We will now push the code to your scratch org. Run the command `sfdx force:source:push` from your terminal. If successful your terminal will look like the image below
   ![alt text](images/terminal.png?raw=true "terminal")
 11. Now we will setup our salesforce page as we have done in the past. 
 - Run command `sfdx force:org:open` which will open your dev hub url. Click on the 9 dots in the upper left hand corner. Go to sales app homepage. Click on the setup gear button in the upper right hand corner and click edit page. On the left hand column you should see Components. On top are the standard components and under them you should see custom. Click and drag dossier component onto your app page in the middle column of the setup page. Save and activate. On activation: Home page default click app default and assign to apps. Click sales, next and save. Back in the upper right corner. Login to microstrategy and your dossier will be embedded on your salesforce page.

 # Below this line are instructions for creating a standard salesforce app. This is not specific to embedding a microstrategy dossier.
------------------------------------------------------------------------------------------------------------------------------------------
# Salesforce App

This guide helps Salesforce developers who are new to Visual Studio Code go from zero to a deployed app using Salesforce Extensions for VS Code and Salesforce CLI.

## Part 1: Choosing a Development Model

There are two types of developer processes or models supported in Salesforce Extensions for VS Code and Salesforce CLI. These models are explained below. Each model offers pros and cons and is fully supported.

### Package Development Model

The package development model allows you to create self-contained applications or libraries that are deployed to your org as a single package. These packages are typically developed against source-tracked orgs called scratch orgs. This development model is geared toward a more modern type of software development process that uses org source tracking, source control, and continuous integration and deployment.

If you are starting a new project, we recommend that you consider the package development model. To start developing with this model in Visual Studio Code, see [Package Development Model with VS Code](https://forcedotcom.github.io/salesforcedx-vscode/articles/user-guide/package-development-model). For details about the model, see the [Package Development Model](https://trailhead.salesforce.com/en/content/learn/modules/sfdx_dev_model) Trailhead module.

If you are developing against scratch orgs, use the command `SFDX: Create Project` (VS Code) or `sfdx force:project:create` (Salesforce CLI)  to create your project. If you used another command, you might want to start over with that command.

When working with source-tracked orgs, use the commands `SFDX: Push Source to Org` (VS Code) or `sfdx force:source:push` (Salesforce CLI) and `SFDX: Pull Source from Org` (VS Code) or `sfdx force:source:pull` (Salesforce CLI). Do not use the `Retrieve` and `Deploy` commands with scratch orgs.

### Org Development Model

The org development model allows you to connect directly to a non-source-tracked org (sandbox, Developer Edition (DE) org, Trailhead Playground, or even a production org) to retrieve and deploy code directly. This model is similar to the type of development you have done in the past using tools such as Force.com IDE or MavensMate.

To start developing with this model in Visual Studio Code, see [Org Development Model with VS Code](https://forcedotcom.github.io/salesforcedx-vscode/articles/user-guide/org-development-model). For details about the model, see the [Org Development Model](https://trailhead.salesforce.com/content/learn/modules/org-development-model) Trailhead module.

If you are developing against non-source-tracked orgs, use the command `SFDX: Create Project with Manifest` (VS Code) or `sfdx force:project:create --manifest` (Salesforce CLI) to create your project. If you used another command, you might want to start over with this command to create a Salesforce DX project.

When working with non-source-tracked orgs, use the commands `SFDX: Deploy Source to Org` (VS Code) or `sfdx force:source:deploy` (Salesforce CLI) and `SFDX: Retrieve Source from Org` (VS Code) or `sfdx force:source:retrieve` (Salesforce CLI). The `Push` and `Pull` commands work only on orgs with source tracking (scratch orgs).

## The `sfdx-project.json` File

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

The most important parts of this file for getting started are the `sfdcLoginUrl` and `packageDirectories` properties.

The `sfdcLoginUrl` specifies the default login URL to use when authorizing an org.

The `packageDirectories` filepath tells VS Code and Salesforce CLI where the metadata files for your project are stored. You need at least one package directory set in your file. The default setting is shown below. If you set the value of the `packageDirectories` property called `path` to `force-app`, by default your metadata goes in the `force-app` directory. If you want to change that directory to something like `src`, simply change the `path` value and make sure the directory you’re pointing to exists.

```json
"packageDirectories" : [
    {
      "path": "force-app",
      "default": true
    }
]
```

## Part 2: Working with Source

For details about developing against scratch orgs, see the [Package Development Model](https://trailhead.salesforce.com/en/content/learn/modules/sfdx_dev_model) module on Trailhead or [Package Development Model with VS Code](https://forcedotcom.github.io/salesforcedx-vscode/articles/user-guide/package-development-model).

For details about developing against orgs that don’t have source tracking, see the [Org Development Model](https://trailhead.salesforce.com/content/learn/modules/org-development-model) module on Trailhead or [Org Development Model with VS Code](https://forcedotcom.github.io/salesforcedx-vscode/articles/user-guide/org-development-model).

## Part 3: Deploying to Production

Don’t deploy your code to production directly from Visual Studio Code. The deploy and retrieve commands do not support transactional operations, which means that a deployment can fail in a partial state. Also, the deploy and retrieve commands don’t run the tests needed for production deployments. The push and pull commands are disabled for orgs that don’t have source tracking, including production orgs.

Deploy your changes to production using [packaging](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_dev2gp.htm) or by [converting your source](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_force_source.htm#cli_reference_convert) into metadata format and using the [metadata deploy command](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_force_mdapi.htm#cli_reference_deploy).

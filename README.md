# ng-simple-blog

Simple blog frontend made with AngularJS 1.6.1 and PureCSS.

## Setup the project

I use Ubuntu 14.04 for the development and testing of this project.

```
# install NodeJS
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

# install bower package manager
npm install -g bower

# clone the repo
git clone https://github.com/alesegdia/ng-simple-blog.git

# enter the directory install dependencies
cd ng-simple-blog
bower install
```

## Run the project

In some browsers, you will need to run a http server in order to correctly
run the project. I used Python's embeeded server:

```
# while in the repository folder
python -m SimpleHTTPServer
```

And the frontend should ready to be used at python's http server default address `http://0.0.0.0:8000`.

## UI/UX facts and decisions

A clean sidebar based design with a serif font has been chosen. Post images have been presented partially, being able to watch them fully by clicking on them. The UI has been focused to editing purposes, and it is presumed that the design is quite intuitive, but steps to interact will be presented just for the record.

* To create a new post, press the plus (+) button near *Blog*. You can close the popup by pressing the same icon, which will change from plus (+) to minus (-), or by actually pressing the *create post* button.
* To remove a post, press the red trash can icon near a post title. A confirm popup will be shown.
* To edit a post, press the blue paper-and-pen icon.

*New post* and *update post* popups are mutually exclusive.

## Internal architecture

Two modules have been created for the development of this frontend. First there is the **resources module**, to store factories and services in order to interact with the RESTful API. Then the **main module**, which contains a **ContentController** and a dummy **AboutController**.

The **ContentController** handles the request of posts to fill the frontend, as well as the functionality to remove, update and create new posts. Simple error report has been implemented when updating and creating posts.

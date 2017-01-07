# ng-simple-blog

Simple blog frontend made with AngularJS 1.6.1 and PureCSS.

## Project setup

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

## Project run

In some browsers, you will need to run a http server in order to correctly
run the project. I used Python's embeeded server:

```
# while in the repository folder
python -m SimpleHTTPServer
```

And the frontend should ready to be used at python's http server default address `http://0.0.0.0:8000`.

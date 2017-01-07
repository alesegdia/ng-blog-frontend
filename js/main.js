(function() {

  var resources = angular.module('agresebe.blog.resources', ['ngResource']);

  resources.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }]);

  resources.factory('Post', ['$resource', function($resource) {
      return $resource('http://blog.agresebe.com/api/posts/:id', null, {
        update: {
          method: 'PUT'
        }
      });
  }]);

  resources.factory('Photo', ['$resource', function($resource) {
      return $resource('http://blog.agresebe.com/api/posts/:id/photos');
  }]);

  resources.service('Utils', [ 'Photo', 'Post', function(Photo, Post) {
    var fillPostsWithPhotos = function(posts) {
      posts.$promise.then(function(response) {
        angular.forEach( posts, function( post, idx ) {
          post.photos = Photo.query({id:post.id});
        });
      });
    };
    this.getPosts = function() {
      var posts = Post.query();
      fillPostsWithPhotos(posts);
      return posts;
    };
  }])

})();

(function() {
  var main = angular.module('agresebe.blog.app', ['agresebe.blog.resources', 'ngRoute', 'underscore']);

  main.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when("/posts", {
        controller: 'ContentController',
        templateUrl: 'templates/posts.html'
      })
      .when("/about", {
        controller: 'AboutController',
        templateUrl: 'templates/about.html'
      })
      .otherwise({
        redirectTo: "/posts"
      });

  }]);

  main.controller('ContentController', [
    '$scope', 'Post', 'Photo', 'Utils', '_', function($scope, Post, Photo, Utils, _) {

      $scope.newPost = new Post();
      $scope.createPost = function() {
        $scope.newPost.$save()
        .then(function(post) {
          $scope.newPostActive = false;
          $scope.posts.push(post);
          $scope.newPost = new Post();
        })
        .catch(function(response) {
          $scope.errorstatus = response.status;
          $scope.errors = response.data;
        });
      };

      $scope.posts = Utils.getPosts();

      $scope.removePostByID = function(post_id) {
        if(confirm("Are you sure you want to delete post with ID " + post_id + "?")) {
          Post.delete({id: post_id}).$promise
          .then(function() {
            var post_index = _.findIndex($scope.posts, { id: post_id });
            $scope.posts.splice(post_index, 1);
          })
          .catch(function(response) {
            $scope.errorstatus = response.status;
            $scope.errors = response.data;
          });
        }
      };

      $scope.editedPost = new Post();
      $scope.postToUpdate = null;

      $scope.closeUpdateDialog = function() {
        $scope.postToUpdate = null;
        $scope.updatePostActive = false;
      };

      $scope.openUpdateDialog = function(post_id) {
        Post.get({id:post_id}).$promise.then(function(response) {
          var post = response;
          $scope.postToUpdate = post;
          $scope.updatePostActive = true;
          $scope.editedPost.title = post.title;
          $scope.editedPost.body = post.body;
          $scope.newPostActive = false;
        });
      };

      $scope.updatePost = function() {
        $scope.postToUpdate.title = $scope.editedPost.title;
        $scope.postToUpdate.body = $scope.editedPost.body;
        Post.update({id: $scope.postToUpdate.id}, $scope.postToUpdate).$promise
        .then(function() {
          var cached_post_index = _.findIndex( $scope.posts, { id : $scope.postToUpdate.id });
          $scope.posts[cached_post_index] = $scope.postToUpdate;
          $scope.closeUpdateDialog();
        })
        .catch(function(response) {
          $scope.errorstatus = response.status;
          $scope.errors = response.data;
        });
      };

      $scope.openNewPostForm = function() {
        $scope.newPostActive = true;
        $scope.updatePostActive = false;
      }

      $scope.closeNewPostForm = function() {
        $scope.newPostActive = false;
      }

      return $scope;
  }]);

  main.controller('AboutController', [
    '$scope', function($scope) {
      return $scope;
    }
  ]);

})();

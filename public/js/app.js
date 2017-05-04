var app = angular.module("contactsApp", ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "list.html",
            controller: "ListController",
            resolve: {
                contacts: function (Contacts) {
                    return Contacts.getContacts();
                }
            }
        })
        .when("/new/contact", {
            controller: "NewContactController",
            templateUrl: "contact-form.html"
        })
        .when("/contact/:contactId", {
            controller: "EditContactController",
            templateUrl: "contact.html"
        })
        .otherwise({
            redirectTo: "/"
        })
});
app.service("Contacts", function ($http) {
    this.getContacts = function () {
        return $http.get("/contacts").
            then(function (response) {
                return response;
            }, function (response) {
                alert("Error finding contacts.");
            });
    }
    this.createContact = function (contact) {
        return $http.post("/contacts", contact).
            then(function (response) {
                return response;
            }, function (response) {
                alert("Error creating contact.");
            });
    }
    this.getContact = function (contactId) {
        var url = "/contacts/" + contactId;
        return $http.get(url).
            then(function (response) {
                return response;
            }, function (response) {
                alert("Error finding this contact.");
            });
    }
    this.editContact = function (contact) {
        var url = "/contacts/" + contact._id;
        console.log(contact._id);
        return $http.put(url, contact).
            then(function (response) {
                return response;
            }, function (response) {
                alert("Error editing this contact.");
                console.log(response);
            });
    }
    this.deleteContact = function (contactId) {
        var url = "/contacts/" + contactId;
        return $http.delete(url).
            then(function (response) {
                return response;
            }, function (response) {
                alert("Error deleting this contact.");
                console.log(response);
            });
    }
});
app.controller("ListController", function (contacts, $scope) {
    $scope.contacts = contacts.data;
})
app.controller("NewContactController", function ($scope, $location, Contacts) {
    $scope.back = function () {
        $location.path("#/");
    }

    $scope.saveContact = function (contact) {
        Contacts.createContact(contact).then(function (doc) {
            var contactUrl = "/contact/" + doc.data._id;
            $location.path(contactUrl);
        }, function (response) {
            alert(response);
        });
    }
})
app.controller("EditContactController", function ($scope, $routeParams, Contacts) {
    Contacts.getContact($routeParams.contactId).then(function (doc) {
        $scope.contact = doc.data;
    }, function (response) {
        alert(response);
    });

    $scope.toggleEdit = function () {
        $scope.editMode = true;
        $scope.contactFormUrl = "contact-form.html";
    }

    $scope.back = function () {
        $scope.editMode = false;
        $scope.contactFormUrl = "";
    }

    $scope.saveContact = function (contact) {
        Contacts.editContact(contact);
        $scope.editMode = false;
        $scope.contactFormUrl = "";
    }

    $scope.deleteContact = function (contactId) {
        Contacts.deleteContact(contactId);
    }
});

app.controller('RestaurantIndia', function ($scope, $http) {
    $scope.res = "";
    $http({
        method: 'GET',
        url: '/menu'
    }).then(function successCallback(response) {
        $scope.res=response.data;
    }, function errorCallback(response) {
        console.log(response);
        alert(angular.toJson(response));
    });
});

app.filter('customArray', function($filter){
    return function(list, arrayFilter, element){
        if(arrayFilter){
            return $filter("filter")(list, function(listItem){
                return arrayFilter.indexOf(listItem[element]) != -1;
            });
        }
    };
});
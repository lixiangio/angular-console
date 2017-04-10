//指定的控制器
app.controller('MailCtrl', ['$scope', function ($scope) {

  //通过$scope为当前Controller中的Model赋值，angular将ng指令转换为JS对象，通过$scope可以访问和改变它们的值
  $scope.folds = [
    { name: 'Inbox', filter: '' },
    { name: 'Starred', filter: 'starred' },
    { name: 'Sent', filter: 'sent' },
    { name: 'Important', filter: 'important' },
    { name: 'Draft', filter: 'draft' },
    { name: 'Trash', filter: 'trash' }
  ];

  $scope.labels = [
    { name: 'Angular', filter: 'angular', color: '#23b7e5' },
    { name: 'Bootstrap', filter: 'bootstrap', color: '#7266ba' },
    { name: 'Client', filter: 'client', color: '#fad733' },
    { name: 'Work', filter: 'work', color: '#27c24c' }
  ];

  $scope.addLabel = function () {
    $scope.labels.push(
      {
        name: $scope.newLabel.name,
        filter: angular.lowercase($scope.newLabel.name),
        color: '#23B7E5'
      }
    );
    $scope.newLabel.name = '';
  }

  $scope.labelClass = function (label) {
    //支持多Class，只有class值为true时才显示
    return {
      'b-l-info': angular.lowercase(label) === 'angular',
      'b-l-primary': angular.lowercase(label) === 'bootstrap',
      'b-l-warning': angular.lowercase(label) === 'client',
      'b-l-success': angular.lowercase(label) === 'work'
    };
  };

}]);

app.controller('MailListCtrl', ['$scope', 'mails', '$stateParams', function ($scope, mails, $stateParams) {
  $scope.fold = $stateParams.fold;
  mails.all().then(function (mails) {
    $scope.mails = mails;
  });
}]);

app.controller('MailDetailCtrl', ['$scope', 'mails', '$stateParams', function ($scope, mails, $stateParams) {
  mails.get($stateParams.mailId).then(function (mail) {
    $scope.mail = mail;
  })
}]);

app.controller('MailNewCtrl', ['$scope', function ($scope) {
  $scope.mail = {
    to: '',
    subject: '',
    content: ''
  }
  $scope.tolist = [
    { name: 'James', email: 'james@gmail.com' },
    { name: 'Luoris Kiso', email: 'luoris.kiso@hotmail.com' },
    { name: 'Lucy Yokes', email: 'lucy.yokes@gmail.com' }
  ];
}]);

angular.module('app').directive('labelColor', function () {
  return function (scope, $el, attrs) {
    $el.css({ 'color': attrs.color });
  }
});
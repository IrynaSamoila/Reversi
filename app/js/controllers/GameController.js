'use strict';

angular.module('app')
	.controller('GameController', function ($scope) {
		var counter = 0;

		$scope.startGame = function(){
			$scope.board = new Array(8);
			$scope.gameOver = false;
			$scope.whiteCount = 0;
			$scope.blackCount = 0;
			counter = 0;

			for (var i = 0; i < $scope.board.length; i++) {
				$scope.board[i] = new Array(8);

				for (var j = 0; j < $scope.board[i].length; j++){
					$scope.board[i][j] = {
						id: j,
						lineId: i,
						state: 'empty'
					};
				}
			}
		};

		$scope.setChip = function(field) {
			if (field.state == 'empty') {
				counter++;

				if (counter%2 != 0) {
					field.state = 'black';
				} else {
					field.state = 'white';
				}

				for (var i = Math.max(field.lineId - 1, 0); i <= Math.min($scope.board.length - 1, field.lineId + 1); i++) {
					for (var j =  Math.max(field.id - 1, 0); j <= Math.min($scope.board[i].length - 1, field.id + 1); j++){
						if ($scope.board[i][j].state != 'empty' && $scope.board[i][j] != field) {
							$scope.board[i][j].state = (field.state == 'black') ? 'black' : 'white';
						}
					}
				}

				if (counter == 64) {
					for (var k = 0; k < $scope.board.length; k++) {
						for (var z = 0; z < $scope.board[k].length; z++){
							if ($scope.board[k][z].state == 'black') {
								$scope.blackCount++;
							} else {
								$scope.whiteCount++;
							}
						}
					}
					$scope.gameOver = true;
				}
			}
		};

		$scope.startGame();
	});

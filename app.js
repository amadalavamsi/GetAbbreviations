var app = angular.module('AbApp', []);
app.controller("AbController",
	function($scope, $http,$location,$window, $rootScope,  $timeout) {	
		
		$scope.findWord = function(word){
		console.log(word.name);
		$scope.res = word.name;	
		$http({
		url : 'http://www.stands4.com/services/v2/abbr.php?uid=6423&tokenid=8iczpRHljGrAyBR7&term='+word.name,
		method : 'GET'
		}).then((response)=>{
		var parser = new DOMParser();
		var doc = parser.parseFromString(response.data, "text/xml");
		$scope.error = null;
		console.log(doc.getElementsByTagName("result")[0].childNodes[2].textContent);
		var text = [];
		//var DataFilter = doc.getElementsByTagName("result")[i].childNodes[7].textContent;
		
		for(var i = 0; doc.getElementsByTagName("result")[i].childNodes[7].textContent >= 1 ; i++){
		//console.log(doc.getElementsByTagName("result")[i].childNodes[2].textContent);
		text[i] = doc.getElementsByTagName("result")[i].childNodes[2].textContent;
		}
		console.log(text);
		$scope.data = Array.from(new Set(text ));
		$scope.wikiData = null;
		}).catch((error)=>{
		$scope.error = 'No content available, try another..!';
		$scope.data = null;
		console.log('error'+error.message);
		});		
		}
			
		$scope.connectWiki = function(x){
			console.log(x);	
			$http({
			url : 'https://en.wikipedia.org/api/rest_v1/page/summary/'+x,
			method : 'GET'
			}).then((response)=>{			
				$scope.wikiData = response.data;
				$scope.data = null;
				console.log($scope.wikiData);
			});
			}
			
		$scope.textToSound = function(){
		console.log($scope.text);
		window.speechSynthesis.speak(new SpeechSynthesisUtterance($scope.wikiData.title));
		}
	});			

		
		
		
		
		
		
		/*
		 * $scope.pageParser = function(){ $http({ url :
		 * 'https://en.wikipedia.org/wiki/List_of_computing_and_IT_abbreviations',
		 * method : 'GET' }).then((response)=>{
		 * 
		 * var xmlString = response.data; var parser = new DOMParser(); var doc =
		 * parser.parseFromString(xmlString, "text/xml");
		 * 
		 * var listOfItems = {}; var len =
		 * doc.firstChild.nextSibling.getElementsByTagName("div").item(10).getElementsByTagName("div").item(3).getElementsByTagName("li").length;
		 * //console.log(doc.firstChild.nextSibling.getElementsByTagName("div").item(10).getElementsByTagName("div").item(3).getElementsByTagName("li")[0].lastChild.textContent);
		 * for(var i = 0; i < len; i++){ var index =
		 * doc.firstChild.nextSibling.getElementsByTagName("div").item(10).getElementsByTagName("div").item(3).getElementsByTagName("li")[i].getElementsByTagName("a")[0].textContent;
		 * var word =
		 * doc.firstChild.nextSibling.getElementsByTagName("div").item(10).getElementsByTagName("div").item(3).getElementsByTagName("li")[i].lastChild.textContent;
		 * listOfItems[index] = word.replace(/[^a-zA-Z0-9]/g, ' ');
		 * //listOfItems.splice(word, word.replace(/[^a-zA-Z0-9]/g, ''));
		 * //listOfItems.join(); // listOfItems.push(new
		 * Object(word.replace(/[^a-zA-Z0-9]/g, ''))); //
		 * console.log(doc.firstChild.nextSibling.getElementsByTagName("div").item(10).getElementsByTagName("div").item(3).getElementsByTagName("li")[i].textContent); }
		 * console.log(listOfItems); console.log(JSON.stringify(listOfItems));
		 * var stringData = JSON.stringify(listOfItems);
		 * 
		 * $http({ url : 'http://localhost:8080/abbreviation/save', method :
		 * 'POST', data : stringData }).then((response)=>{ console.log("success" +
		 * stringData); }).catch(()=>{ console.log('error occured while getting
		 * response..!'); });
		 * 
		 * }); }
		 */
	
		
		
    
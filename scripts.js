function Subject(id, name, credit, mark){
	var self = this;

	self.viewId = 'r' + id;
	self.id = id;
	self.missing = ko.observable();
	self.name = ko.observable(name);
	self.credit = ko.observable(credit);
	self.mark = ko.observable(mark);
}

function AppViewModel(){
	 var self = this;

	 self.stipuha = ko.observable(true);


	 self.subjects = ko.observableArray(
	 	[
	 		new Subject(1, "Декларативне програмування", 4, 71),
	 		new Subject(2, "Архітектура ПЗ", 5, 71),
	 		new Subject(3, "Тестування ПЗ", 5, 71),
	 		new Subject(4, "Менеджмент проектів", 4, 71),
	 		new Subject(5, "ОПР", 4, 71),
	 		new Subject(6, "Безпека програм та даних", 4, 71),
	 		new Subject(7, "Командна розробка", 4, 71)
	 	]
	 );

	 self.infinity = ko.computed(function(){
	 	for(var i = 0; i < self.subjects().length; i++){
	 		console.log('missing iteration');
	 		if(self.subjects()[i].missing() > 50){
	 			console.log('boom');
	 			return true;
	 		}
	 	}
	 	return false;
	 });
 




    self.addSubject = function() {
    	//self.subjects()[self.subjects().length - 1]
        //self.subjects.push(id ,"", 5, 71);
        //console.log(self.subjects()[self.subjects().length - 1].id + 1 )
        var idToUse = self.subjects()[self.subjects().length - 1].id + 1;
        //console.log(idToUse);
        self.subjects.push(new Subject(idToUse ,"", 5, 71));
        console.log(self.subjects());
        //self.
    }
    
    self.removeSubject = function(s) 
    { 
    	$(function(){
    		//console.log(s.id);
    		//$('.table').animate({height: '0px', opacity: 0}, 500);  

    		var el = '#' + s.viewId;

    		console.log(el);

    	$(el).closest('tr')
        .children('td')
        .animate({ padding: 0 })
        .wrapInner('<div />')
        .children()
        .slideUp(function() { $(this).closest('tr').remove();     	self.subjects.remove(s); });

    	});




    }

    self.resetMissing = function() {
        console.log('in resetmissing');

        for(var i = 0; i<self.subjects().length; i++){
			//console.log('subject: ' + self.subjects()[i].name() + ' | credit: ' + self.subjects()[i].credit() + ' | mark: ' + self.subjects()[i].mark())
			self.subjects()[i].missing(0);
		}

    }

    self.calculateMissing = function(avg, credits, marks) {
        console.log('in calculateMissing');

        console.log(credits);

        for(var i = 0; i<self.subjects().length; i++){



        	//var thisMarks = self.subject()[i].mark * self.subject()[i].credit;
        	var c = self.subjects()[i].credit();
        	var m = self.subjects()[i].mark();
        	var Mark = m * c;
        	var OtherSubjectsAverage = marks - Mark;

        	var result = (((71 * credits) - OtherSubjectsAverage)/c)-m;
        	var f = Math.ceil(result);

			self.subjects()[i].missing(f);
		}
    }


    self.avg = ko.computed(function() {
    	console.log(self.infinity());
		var credits = 0;
		var marks = 0;
		for(var i = 0; i<self.subjects().length; i++){
			//console.log('subject: ' + self.subjects()[i].name() + ' | credit: ' + self.subjects()[i].credit() + ' | mark: ' + self.subjects()[i].mark())
			marks += parseFloat(self.subjects()[i].mark() * self.subjects()[i].credit());
			credits += parseFloat(self.subjects()[i].credit());
		}

		var avg = marks/credits;

		if(avg < 71){
			
			self.stipuha(false);
			self.calculateMissing(avg, credits, marks);
		} else{

			self.stipuha(true);
			self.resetMissing();

		}

		return avg;

    }); 

}

ko.applyBindings(new AppViewModel());

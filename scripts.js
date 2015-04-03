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

	 	return self.subjects().every(function(el){
	 		return el.missing() > 50;
	 	});

	 });
 




    self.addSubject = function() {

        var idToUse = self.subjects()[self.subjects().length - 1].id + 1;

        self.subjects.push(new Subject(idToUse ,"", 5, 71));

    }
    
    self.removeSubject = function(s) 
    { 
    	$(function(){

	    	var el = '#' + s.viewId;

	    	$(el).closest('tr')
	        .children('td')
	        .animate({ padding: 0 })
	        .wrapInner('<div />')
	        .children()
	        .slideUp(function() { $(this).closest('tr').remove();     	self.subjects.remove(s); });

    	});

    }

    self.resetMissing = function() {

		self.subjects().forEach(function(el){
			el.missing(0);
		})

    }

    self.calculateMissing = function(avg, credits, marks) {

		self.subjects().forEach(function(el){
			var c = el.credit();
        	var m = el.mark();
        	var Mark = m * c;
        	var OtherSubjectsAverage = marks - Mark;

        	var result = (((71 * credits) - OtherSubjectsAverage)/c)-m;
        	var f = Math.ceil(result);

			el.missing(f);
		})

    }


    self.avg = ko.computed(function() {

		var credits = 0;
		var marks = 0;

		self.subjects().forEach(function(el){
			marks += parseFloat(el.mark() * el.credit());
			credits += parseFloat(el.credit());
		})		

		var avg = marks/credits;

		if(avg < 71){
			
			self.stipuha(false);
			self.calculateMissing(avg, credits, marks);
		} else if(self.stipuha() === false){

			self.stipuha(true);
			self.resetMissing();

		}

		return avg;

    }); 

}

ko.applyBindings(new AppViewModel());

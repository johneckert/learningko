var houses = [];
var labels = ["Name", "Region"];
var regionList = [];

for (i = 0; i < 45; i++) {
  fetch(`https://www.anapioficeandfire.com/api/houses?page=${i}`)
    .then(res => res.json())
    .then(json => {
      json.forEach(house => {
        let houseObj = {
          name: house.name,
          region: house.region,
          coatOfArms: house.coatOfArms,
          words: house.words
        };
        if (!regionList.includes(houseObj.region)) {
          regionList.push(houseObj.region);
        }
        houses.push(houseObj);
      });
    });
}

var formatTitle = function(string) {
  return string.replace(/([A-Z])/g, " $1").replace(/^./, function(str) {
    return str.toUpperCase();
  });
};

console.log(labels);
console.log(houses);
console.log(regionList);

function HousesViewModel() {
  this.houses = ko.observableArray(houses);
  this.labels = ko.observableArray(labels);
  this.regions = ko.observableArray(regionList);
  console.log("r", this.regions());
  this.selectedMotto = ko.observable("");
  this.selectedCrest = ko.observable("");
  this.showDetail = house => {
    this.selectedMotto(house.words);
    this.selectedCrest(house.coatOfArms);
  };
  this.filter = ko.observable();
}

ko.bindingHandlers.color = {
  init: function(
    element,
    valueAccessor,
    allBindings,
    viewModel,
    bindingContext
  ) {},
  update: function(
    element,
    valueAccessor,
    allBindings,
    viewModel,
    bindingContext
  ) {
    let value = valueAccessor();
    let valueUnwrapped = ko.unwrap(value);
    let color = allBindings.get("color") || "black";

    $(element).css("color", color);
  }
};

ko.applyBindings(HousesViewModel());

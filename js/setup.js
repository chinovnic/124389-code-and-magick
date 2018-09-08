'use strict';

// открыть блок с аватаром
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');


// исходные данные волшебников
var nameNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var nameSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];


// получить рандомное значение из массива
var getRandomValue = function (items) {
  var rand = Math.floor(Math.random() * items.length);
  var randomValue = items[rand];
  return randomValue;
};

// создать рандомного волшебника
var getRandomWizard = function () {
  var randomWizard = {
    name: getRandomValue(nameNames) + ' ' + getRandomValue(nameSurnames),
    coatColor: getRandomValue(coatColor),
    eyesColor: getRandomValue(eyesColor)
  };
  return randomWizard;
};

// создать массив из 4 рандомных волшебников
var wizards = [];
while (wizards.length < 4) {
  var oneWizard = getRandomWizard();
  wizards.push(oneWizard);
}


var similarListElement = userDialog.querySelector('.setup-similar-list'); // div со списком похожих персонажей
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item'); // div с шаблоном

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true); // полностью клонировать шаблон

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // добавить имена
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor; // добавить цвет мантий
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor; // добавить цвет глаз

  return wizardElement;
};

// создать фрагмент документа, чтобы добавить в него новые элементы и присоединить к основному дереву
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i])); // во фрагмент добавляются волшебники из функции renderWizard
}
similarListElement.appendChild(fragment); // вставить фрагмент в div


// открыть вкладку "Похожие персонажи"
userDialog.querySelector('.setup-similar').classList.remove('hidden');

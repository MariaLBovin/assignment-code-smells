import { Student } from "./models/student";
import { Temp } from "./models/temp";
import { Product } from "./models/products";
import { User } from "./models/user";

/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function getLength(jumpings: number[]): number {

  return jumpings.reduce((jumpDistanceSoFar, currentJump) => {
    return jumpDistanceSoFar + currentJump });
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */


function getStudentStatus(student: Student): string {
  student.passed = student.handedInOnTime ? true : false;
    return student.passed ? `${student.name} "VG" `  : `${student.name} "IG"`;

}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

  function averageWeeklyTemperature(thisWeeksTemp: Temp[]) {
    const millisecondsInAWeek = 604800000
    const numberOfDaysInWeek = 7
    let temp = 0;
  
    for (let i = 0; i < thisWeeksTemp.length; i++) {
      if ((thisWeeksTemp[i].city === "Stockholm") && (thisWeeksTemp[i].date.getTime() > Date.now() - millisecondsInAWeek )) {
          temp += thisWeeksTemp[i].temperature;
      }
    }
    return temp / numberOfDaysInWeek;
  }

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

function createHeader (name:string){
  const productTitle = document.createElement("h4")
  productTitle.innerHTML = name;
  return productTitle;
}

function createStrongElement(price:number){
  const priceInfo = document.createElement("strong");
  priceInfo.innerHTML = price.toString();
  return priceInfo;

}

function createImgElement (image: string){
  const imageTag = document.createElement("img");
  imageTag.src = image;
  return imageTag;
}

function showProduct(product: Product) {
  const container = document.createElement("div");

  const name = createHeader(product.name);
  container.appendChild(name);

  const price = createStrongElement(product.price);
  container.appendChild(price);

  const image = createImgElement(product.image)
  container.appendChild(image)

}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */

function presentStudents(students: Student[]) {
  for (const student of students) {
    if (student.handedInOnTime) {
      createHtlmPassed();
    } else {
      createHtmlFailed();
    }
  }

  function createHtmlFailed() {
    let container = document.createElement("div");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = false;

    container.appendChild(checkbox);
    let listOfStudents = document.querySelector("ul#failedstudents");
    listOfStudents?.appendChild(container);
  }

  function createHtlmPassed() {
    let container = document.createElement("div");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true;

    container.appendChild(checkbox);
    let listOfStudents = document.querySelector("ul#passedstudents");
    listOfStudents?.appendChild(container);
  }
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */
function concatenateStrings() {
  let texts = ["Lorem", "ipsum", "dolor", "sit", "amet"]
    return texts.join('');
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/

function createUserAge (user : User ){
  const magicNumber = 1970
  
  let ageDiff = Date.now() - user.birthday.getTime();
  let ageDate = new Date(ageDiff);
  let userAge = Math.abs(ageDate.getUTCFullYear() - magicNumber);

  return userAge

}

function createUser( userAge : number ) {

  if ((userAge >= 20)) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
}

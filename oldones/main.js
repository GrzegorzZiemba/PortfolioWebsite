// stworzenie klasy Sky, która będzie czyścić płótno i rysować elementy

class Sky {
  // konstruktor, który przyjmię za argument odwołanie do canvy poprzez querySelector
  constructor(canvas) {
    this.canvas = canvas;
    // tworzymy kontekst do canvasa
    this.ctx = canvas.getContext("2d");
    //przypisujemy do width i height do szerokości i wysokości naszego ekranu
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  // metoda (nazawa taka żęby było dla nas lepsze) inicjalizacja Canvasa, gdzie przypiszemy szerokość i wysokość, kolor 'płótna' czyli naszego tła, oraz go wyczyścimy, ponieważ 'płótno' trzeba na bieżąco czyścić
  initCanvas() {
    //przypisujemy szerkość i wysokośc z konstrutkora do wysokości i szerokości naszego kanwasa
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Kolor w jakim ma być 'tło'
    this.ctx.fillStyle = "#000";
    // tworzymy prostokąt, który będzie zapełniał to tło i będzie miał rolę naszego 'backgroundu', stąd ustawaiamy mu pełną wysokość i szerokość
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  //Stworzenie metody, która będzie tworzyć ilość gwiazd jaką chcemy poprzez podanie parametru cout
  generateStars(count) {
    let stars = [];
    const radius = Math.random() * 4 + 2;

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        color: "#fff",
        radius: radius,
        orginalRadius: radius,
        speed: Math.random() + 0.5,
      });
    }

    this.stars = stars;
  }

  // stworzenie metody, która przejdzie przez wszystkie gwiazdy, TAK aby każda gwiazda była narysowana :)
  drawStars() {
    this.stars.forEach((star) => {
      this.drawStar(star);
    });
  }

  // przejdzie przez gwiazdy i zmiana ich parametrów
  updateStars() {
    this.stars.forEach((star) => {
      star.x += star.speed;
      star.radius = star.orginalRadius * (Math.random() / 3 + 0.5);

      if (star.x >= this.width) {
        star.x = -20;
      }

      if (star.x >= this.width / 2) {
        star.y += 0.1;
      } else {
        star.y -= 0.1;
      }
    });
  }

  //tworzenie 'nakładki' by wyglądało niebo lepiej
  drawOverlayer() {
    /* tworzymy gradient poprzez metodę do kontekstu .createRadialGradient(x0,y0,r0,x1,y1,r1) -> czyli 
    x0, y0, r0 -> pozycja okręgu wewnętrznego gradientu
    x1, y1, r1 -> pozycja okręgu zewnętrznego gradientu
    
    jest to RADIAL -> więc okrągły gradient :)
    */
    let gradient = this.ctx.createRadialGradient(
      this.width / 2,
      this.height / 2,
      250,
      this.width / 2,
      this.height / 2,
      this.width / 2
    );

    // dodajemy kolory do gradientu (dajemy index czyli 1 lub 0 ?)
    gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.6)");
    // uzupełniamy płótno gradientem
    this.ctx.fillStyle = gradient;
    // no i rysujemy prostokąt :)
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  //wyczyszczenie Canvsa

  clearCanvas() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  // star będzie u nas obiekt, który będzie wyglądać tak :
  /* { x: 100,
       y: 100,
       color:'#fff',
       radius: 10, } 
  */
  drawStar(star) {
    //aby narysować taki obiekt, to wpierw musimy zapisać stan początkowy, a aby to zapisać musimy do kontekstu odwołać się do metody save();
    this.ctx.save();
    //pod kolor wypełnienia ustawiamy kolor gwiazdy, który będzie przekazany w obiekcie, poprzez kontekst.fillStyle
    this.ctx.fillStyle = star.color;
    //zaczynamy rysować ścieżkę poprzez beginPath(), którą podpisujemy do kontekstu;
    this.ctx.beginPath();

    //ustawiamy nowy punkt 0,0  naszej siatki poprzez translate w pozycji naszej gwiazdy;
    this.ctx.translate(star.x, star.y);

    //ustawiamy sięna 'czubku' ramienia 1 gwiazdy poprzez moveTo, będzie nam to potrzebne do rysowania jej;
    this.ctx.moveTo(0, 0 - star.radius);

    //pętla do rysowania ramion gwiazdy
    for (let i = 0; i < 5; i++) {
      // by narysować trzeba zrotować siatkę, o określony kąt w prawo, tutaj podajemy nie w stopniach a radianach, // radian to Pi / 180//
      // rotujemy poprzez metodę .rotate(radiany); pamiętajmy, że rysujemy gwiazdę WIĘC ! jak mamy mieć opcję góra dół rysowania to zamiast 5 rogów, mamy ich 10!;
      this.ctx.rotate((Math.PI / 180) * 36);
      // tutaj rysujemy poprzez to, żę linia ma nam skrócić się o połowę co chwilę tak by zamiast 10boku wyszłą nam gwiazda :)
      this.ctx.lineTo(0, 0 - star.radius * 0.5);
      this.ctx.rotate((Math.PI / 180) * 36);
      this.ctx.lineTo(0, 0 - star.radius);
    }

    // tworzymy tę metodę by wypełnić gwiazdę przekazanym kolorem poprzez odwołanie się do kontekstu metodą .fill()
    this.ctx.fill();
    //aby stan kanwasa przywrócić użwyamy metody restore();
    this.ctx.restore();
  }

  // funckja draw, która będzie rysowała/animowała gwiazdy, resetowała tło itp, poprzez to, że będzie wywoływana co jakiś czas
  draw() {
    this.clearCanvas();
    this.drawStars();
    this.updateStars();
    this.drawOverlayer();
    // zamiar wykonania animacji, to nam daję około 60 klatek na sekundę, czyli będzie wykonywana 60 razy  -> powinno nam dać 60 klatek, czasem jest mniej;
    // do tej funkcji window.requestAnimationFrame(wywołujemyCallback/stąd funkcja strzałkowa/);
    window.requestAnimationFrame(() => this.draw());
    // możemy to sprawdzić poprzez jak to się wywołuje console.log("number");
  }

  // inicjalizacja naszego initCanvas
  run() {
    this.initCanvas();
    this.generateStars(500);
    this.draw();
  }
}

//Tworzenie inastancji klasy sky i przypisanie do niej odwołanie do elementu Canvas

const sky = new Sky(document.querySelector("#canvas"));
sky.run();

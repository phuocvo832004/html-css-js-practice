const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = (() => {
  const cars = ["BW"];
  const root = $("#root");
  const input = $("#input");
  const submit = $("#submit");

  return {
    add(car) {
      cars.push(car);
    },
    delete(car) {
      cars.splice(cars.indexOf(car), 1);
    },
    render() {
      const html = cars.map((car) => `<li>${car}</li>`).join("");
      root.innerHTML = html;
    },
    init() {
      const that = this;
      submit.onclick = () => {
        const car = input.value;
        that.add(car);
        that.render();
      };

      this.render();
    },
  };
})();

app.init();

// Участие этих трех человек пока не подтверждено: показываем знак вопроса везде.
(function(){
  const uncertain = new Map([
    [P.sys, 'Сысоева Анна Николаевна (?)'],
    [P.shi, 'Шиляев Александр Эдуардович (?)'],
    [P.nec, 'Нечаева Ольга Ивановна (?)']
  ]);
  const mark = name => uncertain.get(name) || name;

  schedule.forEach(day => day.items.forEach(item => {
    if (item.people) item.people = item.people.map(mark);
    if (item.note) {
      uncertain.forEach((label, original) => {
        item.note = item.note.split(original).join(label);
      });
    }
  }));

  // Обновляем персональные кнопки/списки, если имена уже были отрисованы базовой страницей.
  document.querySelectorAll('button, .person, .chip, .participant, .person-card').forEach(el => {
    uncertain.forEach((label, original) => {
      if (el.textContent.trim() === original) el.textContent = label;
    });
  });

  renderRoute();
  renderAddresses();
})();
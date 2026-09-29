// Убираем дублирующий список участников из текста первой плашки 30 сентября.
(function(){
  const d30=schedule.find(d=>d.iso==='2026-09-30');
  if(!d30) return;
  const first=d30.items.find(i=>i.time==='07:30' && i.title==='Выезд из Кирова');
  if(first){
    first.note='Участие Лянгузовой уточняется.';
  }
  renderRoute();
})();
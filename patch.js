// Актуальные правки поездки. Этот файл накладывается поверх базовой программы.
(function(){
  // Убираем устаревшие блоки и дневник из рабочего лендинга.
  const lead=document.querySelector('.lead');
  if(lead) lead.textContent='Общее расписание, персональные маршруты и адреса.';
  const diaryBtn=[...document.querySelectorAll('.quick button')].find(b=>b.textContent.trim()==='Дневник');
  if(diaryBtn) diaryBtn.remove();
  const diary=document.getElementById('diary'); if(diary) diary.remove();
  const questions=document.getElementById('questions'); if(questions) questions.remove();

  // 29 сентября.
  const d29=schedule.find(d=>d.iso==='2026-09-29');
  if(d29){
    const arrival=d29.items.find(i=>i.time==='08:35' && i.title.includes('Даутовой'));
    if(arrival){arrival.note='Рейс DP6809. Вылет из Москвы в 06:55. Даутова и Примакова сразу едут в ЦПД «Надежда», Новиков — в РООРДИ «Дорогою добра».';arrival.status='user';}
    const hope=d29.items.find(i=>i.title.includes('ЦПД «Надежда»'));
    if(hope) hope.status='ok';
    if(!d29.items.some(i=>i.title.includes('Вылет Пайковой'))){d29.items.push(ev('17:55','Вылет Пайковой в Москву','Аэропорт Победилово','Рейс DP6820.','ok',[P.paik]));}
  }

  // 30 сентября — актуальная последовательность.
  const d30=schedule.find(d=>d.iso==='2026-09-30');
  if(d30){
    const morning=[P.bit,P.suh,P.dau,P.prim,P.nov,P.kor,P.port,P.kish,P.lya];
    const green=[P.bit,P.suh,P.dau,P.prim,P.nov,P.kish,P.lya];
    const afterJoin=[...morning,P.syr,P.ber];
    d30.items=[
      ev('07:30','Выезд из Кирова','Киров / гостиница «Старый дворик» → Верхошижемье','Битова, Сухарникова, Даутова, Примакова, Новиков, Коротаева, Портнягина, Киш, Лянгузова. Участие Лянгузовой уточняется.','user',morning),
      ev('08:33','Приезд Сыркина Г. и Бережной А.','Железнодорожный вокзал, Киров','Утром приезжают в Киров на поезде; позже присоединяются к группе в п. Зелёный.','user',[P.syr,P.ber]),
      ev('по пути','Заезд в Верхошижемье','пгт Верхошижемье, ул. Советская, 1','Портнягина и Коротаева остаются в Верхошижемье. Остальные продолжают маршрут в Советск и п. Зелёный.','user',morning),
      ev('после Верхошижемья','Встреча с НКО «Наши дети»','г. Советск','Разговор с волонтёрами перед посещением интерната в п. Зелёный. Точное время уточняется.','user',green),
      ev('после встречи','Переезд в п. Зелёный','Советск → п. Зелёный, д. 15','Портнягина и Коротаева остаются в Верхошижемье.','user',green),
      ev('до обеда','Советский дом-интернат · п. Зелёный','п. Зелёный, д. 15','Работа в интернате.','user',green.concat([P.sys,P.shi,P.nec])),
      ev('после работы','Сбор всей группы','п. Зелёный','К группе приезжают Портнягина, Коротаева, Сыркин Г. и Бережная А.','user',afterJoin),
      ev('14:40–15:30','Обед · «Кукарский дворик»','г. Советск, ул. Строителей, 35','Время обеда сохраняется по прежнему плану.','ok',afterJoin),
      ev('15:30–16:30','Переезд в Яранск','г. Яранск, ул. Северная, 9','Дальше — по прежнему плану.','ok',afterJoin),
      ev('16:30–17:30','Яранский дом-интернат','г. Яранск, ул. Северная, 9','', 'ok',afterJoin.concat([P.sys,P.shi,P.nec])),
      ev('17:30–18:00','Обсуждение с руководством','г. Яранск, ул. Северная, 9','', 'ok',afterJoin.concat([P.sys,P.shi,P.nec])),
      ev('18:00–21:00','Возвращение в Киров','Яранск → Киров','', 'ok',afterJoin)
    ];
  }

  // 2 октября.
  const d2=schedule.find(d=>d.iso==='2026-10-02');
  if(d2){
    const meeting=d2.items.find(i=>i.title.includes('Межведомственное'));
    if(meeting){meeting.note='Даутова включена в состав участников в обновлённой программе.';meeting.status='ok';}
    if(!d2.items.some(i=>i.title.includes('Консультации детей'))){
      const idx=d2.items.findIndex(i=>i.title.includes('Встреча с волонтёрами'));
      d2.items.splice(idx<0?1:idx,0,ev('время уточняется','Консультации детей в «Дорогою добра»','Киров','Примакова Анастасия Евгеньевна.','ask',[P.prim]));
    }
    const flight=d2.items.find(i=>i.title.includes('Вылет Битовой'));
    if(flight){flight.time='21:30';flight.title='Вылет Битовой, Сухарниковой, Даутовой и Примаковой';flight.note='Рейс DP514. Прилёт в Москву в 23:35.';flight.people=[P.bit,P.suh,P.dau,P.prim];flight.status='user';}
  }

  // Раскрывающийся состав участников прямо внутри плашки мероприятия.
  const extraStyle=document.createElement('style');
  extraStyle.textContent=`.event.has-people{cursor:pointer}.event.has-people .people-hint{margin-top:10px;font-size:12px;font-weight:850;color:var(--blue);display:flex;align-items:center;gap:6px}.event.has-people .people-hint:after{content:'⌄';font-size:16px;transition:.2s}.event.has-people.open .people-hint:after{transform:rotate(180deg)}.event-people{display:none;margin-top:10px;padding:11px 12px;border-radius:14px;background:#f8fbfd;border:1px solid #e2edf3}.event.open .event-people{display:block}.event-people b{display:block;font-size:12px;margin-bottom:6px}.event-people span{display:block;font-size:13px;line-height:1.5}.event.has-people:hover{border-color:#d7e5ed}`;
  document.head.appendChild(extraStyle);

  eventHTML=function(i){
    const has=i.people&&i.people.length;
    const people=has?`<div class="people-hint">Состав · ${i.people.length}</div><div class="event-people"><b>Участники</b><span>${i.people.join('<br>')}</span></div>`:'';
    return `<article class="event ${i.status}${has?' has-people':''}" ${has?'onclick="this.classList.toggle(\'open\')"':''}><div class="event-top"><div class="time">${i.time}</div><div><div class="title">${i.title}</div>${i.place?`<div class="meta">${i.place} · <a onclick="event.stopPropagation()" target="_blank" rel="noopener" href="${mapUrl(i.place)}">карта</a></div>`:''}${i.note?`<div class="note">${i.note}</div>`:''}<span class="badge ${i.status}">${statusName[i.status]}</span>${people}</div></div></article>`;
  };

  // Перерисовываем расписание уже с актуальными данными и раскрытием состава.
  renderRoute();
  renderAddresses();
})();
import type { Excursion, GroupTrip, Yacht } from '~/types'

export const useServicesStore = defineStore('services', () => {
  const excursions = ref<Excursion[]>([
    {
      id: 'istanbul-bosphorus',
      title: 'Круиз по Босфору',
      city: 'Стамбул',
      description: 'Незабываемая прогулка по проливу Босфор с видами на дворцы и мечети.',
      fullDescription: 'Погрузитесь в атмосферу Стамбула во время круиза по проливу Босфор. Вы увидите дворец Долмабахче, крепость Румели Хисар, мечеть Ортакёй и живописные особняки на берегу. Гид расскажет об истории каждого объекта.',
      duration: '3 часа',
      price: 45,
      image: '/images/excursions/bosphorus.jpg',
      images: [
        '/images/excursions/bosphorus.jpg'
      ],
      highlights: ['Дворец Долмабахче', 'Крепость Румели Хисар', 'Мечеть Ортакёй', 'Панорамные виды']
    },
    {
      id: 'antalya-old-town',
      title: 'Старый город Калеичи',
      city: 'Анталья',
      description: 'Пешеходная экскурсия по историческому центру Антальи с посещением знаковых мест.',
      fullDescription: 'Прогуляйтесь по узким улочкам старого города Калеичи. Вы увидите ворота Адриана, минарет Йивли, старый порт и римскую башню Хыдырлык. Экскурсия включает свободное время для покупок и обеда в традиционном ресторане.',
      duration: '4 часа',
      price: 35,
      image: '/images/excursions/kaleici.jpg',
      images: [
        '/images/excursions/kaleici.jpg'
      ],
      highlights: ['Ворота Адриана', 'Минарет Йивли', 'Старый порт', 'Башня Хыдырлык']
    },
    {
      id: 'cappadocia-balloon',
      title: 'Полёт на воздушном шаре',
      city: 'Каппадокия',
      description: 'Захватывающий полёт над скальными формациями и долинами Каппадокии на рассвете.',
      fullDescription: 'Поднимитесь на воздушном шаре на рассвете и насладитесь потрясающими видами на уникальные скальные формации, «каминные трубы фей» и долины Каппадокии. Полёт длится около часа. По завершении — шампанское и сертификат.',
      duration: '1.5 часа',
      price: 180,
      image: '/images/excursions/cappadocia.jpg',
      images: [
        '/images/excursions/cappadocia.jpg'
      ],
      highlights: ['Рассвет над долинами', 'Скальные формации', 'Шампанское после полёта', 'Сертификат']
    },
    {
      id: 'dubai-desert-safari',
      title: 'Сафари по пустыне',
      city: 'Дубай',
      description: 'Приключение в пустыне: джип-сафари, катание на верблюдах и ужин под звёздами.',
      fullDescription: 'Незабываемое приключение в пустыне Дубая. Вас ждёт захватывающая поездка по дюнам на джипе, катание на верблюдах, роспись хной и традиционный ужин-барбекю в бедуинском лагере с шоу танца живота и огненным шоу.',
      duration: '6 часов',
      price: 75,
      image: '/images/excursions/desert-safari.jpg',
      images: [
        '/images/excursions/desert-safari.jpg'
      ],
      highlights: ['Джип-сафари по дюнам', 'Катание на верблюдах', 'Ужин-барбекю', 'Шоу танца живота']
    },
    {
      id: 'montenegro-kotor-bay',
      title: 'Которский залив',
      city: 'Черногория',
      description: 'Морская прогулка по живописному Которскому заливу с остановками в старинных городах.',
      fullDescription: 'Отправьтесь в морское путешествие по самому красивому заливу Европы. Вы посетите старый город Котор (наследие ЮНЕСКО), остров Богородицы на Рифе, городок Пераст и насладитесь купанием в кристально чистых водах залива.',
      duration: '8 часов',
      price: 60,
      image: '/images/excursions/kotor.jpg',
      images: [
        '/images/excursions/kotor.jpg'
      ],
      highlights: ['Старый город Котор', 'Остров Богородицы', 'Пераст', 'Купание в заливе']
    }
  ])

  const yachts = ref<Yacht[]>([
    {
      id: 'azure-42',
      title: 'Azure 42',
      type: 'Моторная яхта',
      capacity: 8,
      length: '12.8 м',
      description: 'Комфортная моторная яхта для дневных прогулок и небольших вечеринок.',
      fullDescription: 'Azure 42 — элегантная моторная яхта длиной 12.8 метров. Идеально подходит для дневных прогулок вдоль побережья, рыбалки и небольших вечеринок. На борту: просторная палуба для загара, салон с кондиционером, полностью оборудованная кухня и туалет.',
      pricePerHour: 150,
      image: '/images/yachts/azure-42.jpg',
      images: [
        '/images/yachts/azure-42.jpg'
      ],
      features: ['Палуба для загара', 'Кондиционер', 'Кухня', 'Музыкальная система', 'Снорклинг-оборудование']
    },
    {
      id: 'sea-breeze-55',
      title: 'Sea Breeze 55',
      type: 'Парусная яхта',
      capacity: 12,
      length: '16.7 м',
      description: 'Просторная парусная яхта для романтических прогулок и морских путешествий.',
      fullDescription: 'Sea Breeze 55 — классическая парусная яхта длиной 16.7 метров. Две каюты, просторный кокпит и полный набор парусов. Идеальна для романтических закатов, дневных круизов и многодневных путешествий по островам. Капитан включён в стоимость.',
      pricePerHour: 220,
      image: '/images/yachts/sea-breeze-55.jpg',
      images: [
        '/images/yachts/sea-breeze-55.jpg'
      ],
      features: ['2 каюты', 'Капитан включён', 'Полный набор парусов', 'Тендер', 'Рыболовное снаряжение']
    },
    {
      id: 'royal-luxe-70',
      title: 'Royal Luxe 70',
      type: 'Люксовая яхта',
      capacity: 20,
      length: '21.3 м',
      description: 'Премиальная яхта для VIP-мероприятий и эксклюзивных морских путешествий.',
      fullDescription: 'Royal Luxe 70 — флагман нашего флота. 21.3 метра роскоши: три каюты с ванными комнатами, джакузи на палубе, профессиональная кухня, бар и обеденная зона на 20 гостей. Экипаж из трёх человек к вашим услугам.',
      pricePerHour: 450,
      image: '/images/yachts/royal-luxe-70.jpg',
      images: [
        '/images/yachts/royal-luxe-70.jpg'
      ],
      features: ['3 каюты', 'Джакузи', 'Профессиональная кухня', 'Бар', 'Экипаж из 3 человек', 'Водные игрушки']
    }
  ])

  const groupTrips = ref<GroupTrip[]>([
    {
      id: 'sea-cruise',
      title: 'Морская прогулка',
      description: 'Групповая морская прогулка вдоль живописного побережья. Идеально для тех, кто хочет насладиться морем в компании.',
      fullDescription: 'Присоединяйтесь к групповой морской прогулке на комфортабельном катере. Вас ждут потрясающие виды на побережье, остановка для купания в открытом море, прохладительные напитки на борту и отличное настроение. Прогулка проходит ежедневно, отправление из порта Антальи.',
      duration: '45 минут',
      pricePerTicket: 2200,
      image: '/images/group-trips/sea-cruise.jpg',
      images: [
        '/images/group-trips/sea-cruise.jpg'
      ],
      highlights: ['Живописное побережье', 'Остановка для купания', 'Напитки на борту', 'Ежедневное отправление']
    },
    {
      id: 'sea-fishing',
      title: 'Морская рыбалка',
      description: 'Групповая морская рыбалка с опытным капитаном. Снасти и наживка включены в стоимость.',
      fullDescription: 'Отправляйтесь на морскую рыбалку в открытое море! Опытный капитан отвезёт вас к лучшим рыбным местам. Все снасти и наживка включены в стоимость. Вы сможете поймать дораду, сибаса, барракуду и другие виды рыб. Улов можно забрать с собой или приготовить в ресторане на берегу.',
      duration: '3 часа',
      pricePerTicket: 3000,
      image: '/images/group-trips/sea-fishing.jpg',
      images: [
        '/images/group-trips/sea-fishing.jpg'
      ],
      highlights: ['Опытный капитан', 'Снасти включены', 'Лучшие рыбные места', 'Улов с собой']
    }
  ])

  function getExcursionById(id: string): Excursion | undefined {
    return excursions.value.find(e => e.id === id)
  }

  function getYachtById(id: string): Yacht | undefined {
    return yachts.value.find(y => y.id === id)
  }

  function getGroupTripById(id: string): GroupTrip | undefined {
    return groupTrips.value.find(g => g.id === id)
  }

  const popularExcursions = computed(() => excursions.value.slice(0, 3))
  const popularYachts = computed(() => yachts.value.slice(0, 2))

  return {
    excursions,
    yachts,
    groupTrips,
    popularExcursions,
    popularYachts,
    getExcursionById,
    getYachtById,
    getGroupTripById
  }
})

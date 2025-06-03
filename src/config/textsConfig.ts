export const TEXTS = {
  errors: {
    default: 'Не вдалося завантажити дані',
    network: 'Проблеми з інтернетом',
    timeout: 'Сервер довго не відповідає',
    notFound: 'Дані не знайдено',
    server: 'Проблеми на сервері',
    title: 'Ой, щось не так',
  },
  buttons: {
    retry: '🔄 Спробувати знову',
    loadMore: 'Load More',
  },
  loading: {
    initial: 'Loading campers...',
    more: 'Loading more...',
  },
  catalog: {
    title: 'Camper Catalog',
    allLoaded: 'All campers have been loaded!',
  },
} as const;

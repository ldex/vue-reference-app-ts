import { reactive, toRefs, watch, computed } from "vue";

interface Item {
  name: string;
  [key: string]: any;
}

interface State {
  selectedItem: Item | null;
  filterName: string;
  sortName: string;
  sortDir: 'asc' | 'desc';
  pageNumber: number;
}

export default function useList(
  items: Item[],
  pageSize: number,
  defaultSortName: string,
  defaultSortDir: 'asc' | 'desc'
) {
  const state = reactive<State>({
    selectedItem: null,
    filterName: "",
    sortName: defaultSortName,
    sortDir: defaultSortDir,
    pageNumber: 1,
  });

  watch([() => state.filterName, () => state.sortName, () => state.sortDir], () => {
    state.pageNumber = 1;
  })

  const sort = (s: string) => {
    if (s === state.sortName) {
      state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
    }
    state.sortName = s;
  };

  const nextPage = () => {
    state.pageNumber++;
    state.selectedItem = null;
  };

  const prevPage = () => {
    state.pageNumber--;
    state.selectedItem = null;
  };

  const pageCount = computed(() => {
    let l = filteredItems.value.length,
      s = pageSize;
    return Math.floor(l / s);
  });

  const filteredItems = computed(() => {
    let filter = new RegExp(state.filterName, "i");
    return items.filter((el) => el.name.match(filter));
  });

  const sortedFilteredItems = computed(() => {
    return [...filteredItems.value].sort((a, b) => {
      let modifier = 1;
      if (state.sortDir === "desc") modifier = -1;
      if (a[state.sortName] < b[state.sortName]) return -1 * modifier;
      if (a[state.sortName] > b[state.sortName]) return 1 * modifier;
      return 0;
    });
  });

  const sortedFilteredPaginatedItems = computed(() => {
    const start = (state.pageNumber - 1) * pageSize,
      end = start + pageSize;

    return sortedFilteredItems.value.slice(start, end);
  });

  const itemsNumber = computed(() => {
    return sortedFilteredItems.value.length;
  });

  return {
    sort,
    nextPage,
    prevPage,
    pageCount,
    itemsNumber,
    sortedFilteredPaginatedItems,
    ...toRefs(state),
  };
}
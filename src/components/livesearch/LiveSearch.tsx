import React, { useState, useEffect, useRef, ReactNode } from "react";
import { StyledLiveSearch } from "./LiveSearch.Styled";
import { Label } from "../label/Label";
import { InputHelper } from "../inputhelper/InputHelper";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

type LiveSearchProps<T> = {
  label: string;
  placeholder?: string;
  titleField: keyof T;
  identifierField: keyof T;
  renderMatchAll: (item: T, renderedTitle: ReactNode) => ReactNode;
  renderItem: (item: T, renderedTitle: ReactNode) => ReactNode;
  handleSearch: (query: string, page: number) => Promise<any>;
  searchSuggestionWhenEmpty?: boolean;
};

function LiveSearch<T>({
  label,
  placeholder,
  renderMatchAll,
  renderItem,
  handleSearch,
  titleField,
  identifierField,
  searchSuggestionWhenEmpty = true,
}: LiveSearchProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [textWidth, setTextWidth] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [registerMatch, setRegisterMatch] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const measureTextWidth = (text: string) => {
    if (inputRef.current) {
      const computedStyle = window.getComputedStyle(inputRef.current);
      const paddingLeft = parseFloat(computedStyle.paddingLeft);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (context) {
        context.font = computedStyle.font;
        const textWidth = context.measureText(text).width;

        return textWidth + paddingLeft + 8;
      }
    }

    return 0;
  };

  function handleScroll() {
    if (dropdownRef.current && !isFetching) {
      const { scrollTop, scrollHeight, clientHeight } = dropdownRef.current;

      if (
        scrollTop + clientHeight >= scrollHeight - 10 &&
        scrollTop > 0 &&
        currentPage < totalPages
      ) {
        setIsFetching(true);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  }

  function getData() {
    setIsFetching(true);
    handleSearch?.(searchTerm, currentPage).then((response) => {
      const { data } = response;
      const newResults = [...results, ...data.results];

      const indexMatch = newResults.findIndex(
        (item) =>
          String(item[titleField]).toLowerCase() === searchTerm.toLowerCase()
      );

      if (indexMatch === -1) {
        setRegisterMatch(null);
      } else {
        const matchedItem = newResults[indexMatch];
        setRegisterMatch(matchedItem.id);

        if (indexMatch > 0) {
          newResults.splice(indexMatch, 1);
          newResults.unshift(matchedItem);
        }
      }

      setResults(newResults);

      setTotalPages(data.total_pages);
      setIsFetching(false);

      if (newResults.length > 0) {
        setSuggestion(newResults[0][titleField]);
      } else {
        setSuggestion("");
      }
    });
  }

  useEffect(() => {
    if (searchTerm != null && searchTerm.length > 0) {
      setIsFetching(true);
      const delayDebounceFn = setTimeout(() => {
        getData();
      }, 300);

      setIsDropdownVisible(true);

      return () => {
        clearTimeout(delayDebounceFn);
      };
    } else {
      setResults([]);
      setSuggestion("");
      setIsDropdownVisible(false);
      setCurrentPage(1);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (currentPage > 1) {
      setIsFetching(true);
      getData();
    }
  }, [currentPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (dropdownRef.current) {
      dropdownRef.current.scrollTop = 0;
    }

    setCurrentPage(1);
    setIsFetching(false);
    setResults([]);
    const value = e.target.value;
    setSearchTerm(value);

    setTextWidth(measureTextWidth(value));
  };

  function renderArrow() {
    let Arrow = MdOutlineKeyboardArrowDown;
    let color = "#464646";

    if (isDropdownVisible) {
      Arrow = MdOutlineKeyboardArrowUp;
      color = "#006EFF";
    }

    return (
      <StyledLiveSearch.ArrowContent>
        <Arrow size={30} color={color} />
      </StyledLiveSearch.ArrowContent>
    );
  }

  function renderSuggestion() {
    if (
      suggestion != null &&
      searchTerm != null &&
      suggestion.length > 0 &&
      searchTerm.length > 0 &&
      suggestion.toLowerCase() !== searchTerm.toLowerCase()
    ) {
      return (
        <StyledLiveSearch.Suggestion offset={textWidth}>
          {suggestion.substring(searchTerm.length)} - Utilize a tecla → para
          aceitar a sugestão
        </StyledLiveSearch.Suggestion>
      );
    }

    return null;
  }

  function highlightMatch(text: string, searchTerm: string) {
    const lowerText = text.toLowerCase();
    const lowerSearchTerm = searchTerm.toLowerCase();

    const startIndex = lowerText.indexOf(lowerSearchTerm);
    if (startIndex === -1) {
      return <StyledLiveSearch.ListItemTitle>{text}</StyledLiveSearch.ListItemTitle>;
    }

    const beforeMatch = text.slice(0, startIndex);
    const match = text.slice(startIndex, startIndex + searchTerm.length);
    const afterMatch = text.slice(startIndex + searchTerm.length);

    return (
      <StyledLiveSearch.ListItemTitle>
        {beforeMatch}
        <StyledLiveSearch.Highlight>{match}</StyledLiveSearch.Highlight>
        {afterMatch}
      </StyledLiveSearch.ListItemTitle>
    );
  }

  function renderWithoutResults() {
    return (
      <StyledLiveSearch.ListItemEmpty>
          <div>Nenhum resultado encontrado</div>
          {searchSuggestionWhenEmpty ? (
            <a
              href={`https://www.google.com/search?q=${searchTerm}`}
              target="_blank"
            >
              Buscar <strong>{searchTerm}</strong> no Google
            </a>
          ) : null}
      </StyledLiveSearch.ListItemEmpty>
    );
  }

  function renderResults() {
    return results.map((item, index) => {
      const matchAll =
        registerMatch != null &&
        registerMatch === Number(item[identifierField]);
      return (
        <StyledLiveSearch.ListItem key={index} matchAll={matchAll}>
          {matchAll
            ? renderMatchAll(
                item,
                highlightMatch(String(item[titleField]), searchTerm)
              )
            : renderItem(
                item,
                highlightMatch(String(item[titleField]), searchTerm)
              )}
        </StyledLiveSearch.ListItem>
      );
    });
  }

  function renderLoading() {
    return (
      <StyledLiveSearch.ListItemEmpty>
        <div>Pesquisando...</div>
      </StyledLiveSearch.ListItemEmpty>
    );
  }

  function renderDropdownContent() {
    if (results.length > 0) {
      return renderResults();
    } else if (isFetching) {
      return renderLoading();
    } else {
      return renderWithoutResults();
    }
  }

  function renderDropdown() {
    return (
      <StyledLiveSearch.Dropdown ref={dropdownRef} onScroll={handleScroll}>
        {renderDropdownContent()}
      </StyledLiveSearch.Dropdown>
    );
  }

  return (
    <StyledLiveSearch.Content>
      <Label>{label}</Label>
      <StyledLiveSearch.InputContent>
        <StyledLiveSearch.Input
          ref={inputRef}
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
        {renderArrow()}
        {renderSuggestion()}
      </StyledLiveSearch.InputContent>
      <InputHelper>
        Utilize as teclas ↓ ↑ para navegar entre as opções
      </InputHelper>
      {isDropdownVisible ? renderDropdown() : null}
    </StyledLiveSearch.Content>
  );
}

export default LiveSearch;

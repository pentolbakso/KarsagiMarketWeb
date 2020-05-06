import React, { useEffect, useState, useRef } from "react";
import { Input, Icon, Segment, Message, Button, Form } from "semantic-ui-react";
import Router from "next/router";
import { event } from "../lib/gtag";

const SearchBox = ({ value }) => {
  const inputRef = useRef(null);
  const [error, setError] = useState(null);

  function handleSearch() {
    if (!inputRef.current) return;

    let keyword = inputRef.current.value;
    if (keyword.length > 0 && keyword.length < 3) {
      setError("Keyword terlalu pendek!");
      return;
    }
    setError(null);
    event("search", "engagement", "search_term", keyword);

    Router.push({
      pathname: "/",
      query: { keyword },
    });
  }

  return (
    <>
      <Form>
        <Input fluid placeholder="misal: Ayam kampung" action>
          <input ref={inputRef} defaultValue={value || ""} />
          <Button type="submit" color="blue" onClick={handleSearch}>
            Cari
          </Button>
        </Input>
      </Form>
      {error && <p style={{ color: "#cc0000", fontSize: 14 }}>{error}</p>}
    </>
  );
};

export default SearchBox;

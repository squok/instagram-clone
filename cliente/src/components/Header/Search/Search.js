import React, { useState, useEffect } from "react";
import { Search as SearchSI, Image } from "semantic-ui-react";
import "./Search.scss";
import { size } from "lodash";
import { Link } from "react-router-dom";
import { SEARCH } from "../../../gql/user";
import { useQuery } from "@apollo/client";
import ImageNoFound from "../../../assets/png/avatar.png";

export default function Search() {
  const [search, setSearch] = useState(null);
  const [results, setResults] = useState([]);
  const { data, loading } = useQuery(SEARCH, {
    variables: { search },
  });

  useEffect(() => {
    if (size(data?.search) > 0) {
      const users = [];
      data.search.forEach((user, index) => {
        users.push({
          key: index,
          title: user.name,
          username: user.username,
          avatar: user.avatar,
        });
      });
      setResults(users);
    } else {
      setResults([]);
    }
  }, [data]);

  const onChange = (e) => {
    if (e.target.value) setSearch(e.target.value);
    else setSearch(null);
  };
  const handleResultSelect = () => {
    setSearch(null);
    setResults([]);
  };
  return (
    <SearchSI
      className="search-users"
      fluid
      loading={loading}
      input={{ icon: "search", iconPosition: "left" }}
      onSearchChange={onChange}
      value={search || ""}
      results={results}
      onResultSelect={handleResultSelect}
      resultRenderer={(e) => <ResultsSearch data={e} />}
    />
  );
}
function ResultsSearch(props) {
  const { data } = props;

  return (
    <Link className="search-users__item" to={`/${data.username}`}>
      <Image src={data.avatar || ImageNoFound} />
      <div>
        <p>{data.title}</p>
        <p>{data.username}</p>
      </div>
    </Link>
  );
}

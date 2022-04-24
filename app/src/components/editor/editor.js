import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Editor() {
  const [_state, setState] = useState({
    pageList: [],
    newPageName: "",
  });

  const _setState = (data) => setState((state) => ({ ...state, ...data }));

  useEffect(() => {
    loadPageList();
    // return () => {
    //   cleanup
    // };
  }, [_setState.pageList]);

  function loadPageList() {
    axios
      .get("./api")
      .then((res) => _setState({ pageList: res.data }))
      .catch(alert);
  }

  function createNewPage() {
    axios
      .post("./api/createNewPage.php", {
        name: _state.newPageName,
      })
      .then(loadPageList)
      .catch(alert);
  }

  const { pageList } = _state;
  const pages = pageList.map((page, i) => {
    return <h1 key={i}>{page}</h1>;
  });

  return (
    <>
      <input onChange={(e) => _setState({ newPageName: e.target.value })} type="text" />
      <button onClick={createNewPage}>Создать страницу</button>
      {pages}
    </>
  );
}
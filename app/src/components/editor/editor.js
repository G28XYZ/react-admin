import axios from "axios";
import React, { useState, useEffect } from "react";
import "../../helpers/iframeLoader.js";

export default function Editor() {
  let iframe;
  const [currentPage, setCurrentPage] = useState("index.html");
  const [_state, setState] = useState({
    pageList: [],
    newPageName: "",
  });

  const _setState = (data) => setState((state) => ({ ...state, ...data }));

  useEffect(() => {
    init(currentPage);
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

  function init(page) {
    iframe = document.querySelector("iframe");
    open(page);
    loadPageList();
  }

  function open(page) {
    setCurrentPage(`../${page}`);
    iframe.load(currentPage, () => {
      console.log(currentPage);
    });
  }

  function createNewPage() {
    axios
      .post("./api/createNewPage.php", {
        name: _state.newPageName,
      })
      .then(loadPageList)
      .catch(alert);
  }

  function deletePage(page) {
    axios
      .post("./api/deletePage.php", { name: page })
      .then(loadPageList)
      .catch(() => alert("Страницы не существует"));
  }

  const { pageList } = _state;
  const pages = pageList.map((page, i) => {
    return (
      <h1 key={i}>
        {page}
        <a href="#" onClick={() => deletePage(page)}>
          (x)
        </a>
      </h1>
    );
  });

  return (
    <iframe src={currentPage} frameBorder={0}></iframe>
    // <>
    //   <input onChange={(e) => _setState({ newPageName: e.target.value })} type="text" />
    //   <button onClick={createNewPage}>Создать страницу</button>
    //   {pages}
    // </>
  );
}

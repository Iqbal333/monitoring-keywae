import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Tag } from "antd";
import { deleteTag, emptyTaglist, closeOtherTags } from "../../../../store/actions";
class TagList extends Component {
  tagListContainer = React.createRef();
  contextMenuContainer = React.createRef();
  state = {
    left: 0,
    top: 0,
    menuVisible: false,
  };
  handleClose = (tag) => {
    const { history, deleteTag, taglist } = this.props;
    const path = tag.path;
    const currentPath = history.location.pathname;
    const length = taglist.length;
    // Jika halaman saat ini ditutup, lompat ke tag terakhir
    if (path === currentPath) {
      history.push(taglist[length - 1].path);
    }
    // Jika tag terakhir ditutup dan halaman yang sesuai dengan tag terakhir sedang ditampilkan, lompatan perutean akan dilakukan
    if (
      path === taglist[length - 1].path &&
      currentPath === taglist[length - 1].path
    ) {
      // Karena cutTaglist dijalankan di bagian akhir, lompat ke rute yang sesuai dari tag sebelumnya, seharusnya -2
      if (length - 2 > 0) {
        history.push(taglist[length - 2].path);
      } else if (length === 2) {
        history.push(taglist[0].path);
      }
    }

    // Lompat ke rute terlebih dahulu, lalu ubah taglist
    deleteTag(tag);
  };
  handleClick = (path) => {
    this.props.history.push(path);
  };
  openContextMenu = (tag, event) => {
    event.preventDefault();
    const menuMinWidth = 105;
    const clickX = event.clientX;
    const clickY = event.clientY; //Koordinat Y mouse saat peristiwa terjadi
    const clientWidth = this.tagListContainer.current.clientWidth; // container width
    const maxLeft = clientWidth - menuMinWidth; // left boundary

    // Ketika posisi klik mouse lebih besar dari batas kiri, berarti posisi klik mouse berada di sebelah kanan, dan menu diletakkan di sebelah kiri
    if (clickX > maxLeft) {
      this.setState({
        left: clickX - menuMinWidth + 15,
        top: clickY,
        menuVisible: true,
        currentTag: tag,
      });
    } else {
      // Sebaliknya, saat mouse mengklik ke kiri, tempatkan menu di sebelah kanan
      this.setState({
        left: clickX,
        top: clickY,
        menuVisible: true,
        currentTag: tag,
      });
    }
  };
  handleClickOutside = (event) => {
    const { menuVisible } = this.state;
    const isOutside = !(
      this.contextMenuContainer.current &&
      this.contextMenuContainer.current.contains(event.target)
    );
    if (isOutside && menuVisible) {
      this.closeContextMenu();
    }
  };
  closeContextMenu() {
    this.setState({
      menuVisible: false,
    });
  }
  UNSAFE_componentWillUnmount() {
    document.body.removeEventListener("click", this.handleClickOutside);
  }
  handleCloseAllTags = () => {
    this.props.emptyTaglist();
    this.props.history.push("/dashboard");
    this.closeContextMenu();
  };
  handleCloseOtherTags = () => {
    const currentTag = this.state.currentTag;
    const { path } = currentTag;
    this.props.closeOtherTags(currentTag)
    this.props.history.push(path);
    this.closeContextMenu();
  };
  render() {
    const { left, top, menuVisible } = this.state;
    const { taglist } = this.props;
    // const currentPath = history.location.pathname;
    const currentPath = '/';
    
    return (
      <>
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          hideTracksWhenNotNeeded={true}
          renderView={(props) => (
            <div {...props} className="scrollbar-container" />
          )}
          renderTrackVertical={(props) => (
            <div {...props} className="scrollbar-track-vertical" />
          )}
        >
          <ul className="tags-wrap" ref={this.tagListContainer}>
            {taglist.map((tag) => (
              <li key={Math.random() * 100}>
                <Tag
                  onClose={this.handleClose.bind(null, tag)}
                  closable={tag.path !== "/dashboard"}
                  color={currentPath === tag.path ? "geekblue" : "gold"}
                  onClick={this.handleClick.bind(null, tag.path)}
                  onContextMenu={this.openContextMenu.bind(null, tag)}
                >
                  {tag.title}
                </Tag>
              </li>
            ))}
          </ul>
        </Scrollbars>
        {menuVisible ? (
          <ul
            className="contextmenu"
            style={{ left: `${left}px`, top: `${top}px` }}
            ref={this.contextMenuContainer}
          >
            <li onClick={this.handleCloseOtherTags}>Close other</li>
            <li onClick={this.handleCloseAllTags}>Close all</li>
          </ul>
        ) : null}
      </>
    );
  }
}
export default withRouter(
  connect((state) => state.tagsView, {
    deleteTag,
    emptyTaglist,
    closeOtherTags,
  })(TagList)
);

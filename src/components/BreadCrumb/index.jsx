import React from 'react';
import { withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import menuList from '@/config/menuConfig';
import './index.less';

const getPath = (menuList, pathname) => {
  let temppath = [];
  try {
    function getNodePath(node) {
      temppath.push(node);
      if (node.type !== 'group') {
        if (node.path === pathname) {
          throw new Error('GOT IT!');
        }
      }
      if (node.children && node.children.length > 0) {
        for (var i = 0; i < node.children.length; i++) {
          getNodePath(node.children[i]);
        }
        temppath.pop();
      } else {
        temppath.pop();
      }
    }

    for (let i = 0; i < menuList.length; i++) {
      getNodePath(menuList[i]);
    }
  } catch (e) {
    // temppath = temppath?.map((val, index) => {
    //   // Mematikan fungsi anchor href untuk sub menu
    //   if (index > 0) {
    //     val.href = undefined
    //     val.path = undefined
    //   }
    //   return val
    // })
    return temppath;
  }
};

// const getRealPath = (menuList, pathname) => {
//   console.log(menuList)
//   let temp = pathname !== '/dashboard' ? [{ title: 'Dashboard', href: '/dashboard' }]:[];
//   let path = pathname.match(/\/\w+/g)
//   if (path.length === 1) {
//       temp = temp.concat(menuList.reduce((pre, items) => {
//         if (items.key === path[0] && path !== '/dashboard') {
//           items.path = undefined
//           items.href = undefined
//           pre.push(items);
//         }
//         return pre;
//       },[]))
//       return temp;  
//   } else if (path.length > 1) {
//       temp = temp.concat(menuList.reduce((pre, items) => {
//         if (items.key === path[0] && path !== '/dashboard') {
//           items.path = undefined
//           items.href = undefined
//           pre.push(items);
//         }
    
//         if (items.children && items.children.length > 0) {
//           for (let i = 0; i < items.children.length; i++) {
//             if (items.children[i].key === pathname) {
//               items.children[i].path = undefined
//               items.children[i].href = undefined
//               pre.push(items.children[i])
//             } 
//           }
//         }
//         return pre
//       },[]))
//       return temp
//   } else {
//     return temp
//   }
// }

const BreadCrumb = (props) => {
  const { location } = props;
  const { pathname } = location;

  let path = getPath(menuList, pathname);

  return (
    <div className='Breadcrumb-container'>
      <Breadcrumb
        separator="/"
        items={path}
      />
    </div>
  );
};

export default withRouter(BreadCrumb);

// Function to find data by child item
export function findDataByChild(dataArray, targetChild) {
  for (const item of dataArray) {
      if (item.children) {
          const foundChild = item.children.find(
              (child) => typeof child === 'string' && child === targetChild
          );
          if (foundChild) {
              return item;
          } else {
              const foundNestedChild = findDataByChild(item.children, targetChild);
              if (foundNestedChild) {
                  return item;
              }
          }
      }
  }
  return null;
}


// Function to generate the nested accordion
function generateChildren(children) {
    let childrenHtml = '<ul class="list-group border-0">';
    children.forEach((child) => {
        if (typeof child === 'string') {
            childrenHtml += `<li class="list-group-item border-0"><span class="item">${child}</span></li>`;
        } else if (typeof child === 'object' && child.title && Array.isArray(child.children)) {
            childrenHtml += `
          <li>
            <div class="card-header">
              <span>${child.title}</span>
            </div>
            <div class="card-body border-0">
              ${generateChildren(child.children)}
            </div>
          </li>
        `;
        }
    });
    childrenHtml += '</ul>';
    return childrenHtml;
}

export function generateAccordion(item, index) {
  const accordionItem = `
      <div class="card border-0">
        <div class="card-header" id="heading${index}">
          <div>
            <span>
              ${item.title}
            </span>
          </div>
        </div>
        <div id="collapse${index}" class="show">
          <div class="card-body border-0">
            ${generateChildren(item.children)}
          </div>
        </div>
      </div>
  `;
  return accordionItem;
}

// Function to generate the nested dropdown
export function generateDropdownItems(children) {
  let html = '';
  children.forEach((child) => {
      if (typeof child === 'string') {
          html += `<li><div class="dropdown-item pointer">${child}</div></li>`;
      } else if (typeof child === 'object' && child.title && Array.isArray(child.children)) {
          html += `
                      <li class="dropdown-submenu">
                          <div class="dropdown-item dropdown-toggle pointer" role="button">${child.title}</div>
                          <ul class="dropdown-menu">
                              ${generateDropdownItems(child.children)}
                          </ul>
                      </li>
                  `;
      }
  });
  return html;
}

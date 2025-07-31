// import Component from "../../../../component/Component";
// import SSRComponent from "../../../../component/SSRComponent"
import SSRNode from "../../../../../components/node/SSRNode"
import _NodeColumnRow from "./_NodeColumnRow";

const SSRNodeColumnRow = ({ 
  params, 
  searchParams, 
  template_nodes,
  parent_node, 
  rowIndex, 
  columnIndex, 
  columnRowIndex, 
  node,
  mode, 
  actions}) => {

    
    return (<_NodeColumnRow 
      params={params} searchParams={searchParams}
      template_nodes={template_nodes}
      parent_node={parent_node} 
      rowIndex={rowIndex} 
      columnIndex={columnIndex} 
      columnRowIndex={columnRowIndex} 
      node={node} 
      mode={mode} 
      actions={actions} 
      NodeComponent={SSRNode}
      />)


};

SSRNodeColumnRow.propTypes =  {
//   parent_array:PropTypes.array,
//   rowIndex:PropTypes.number,
//   columnIndex:PropTypes.number,
//   columnRowIndex:PropTypes.number,
//   component: PropTypes.object,
//   parent: PropTypes.object,
//   mode: PropTypes.string,
//   actions: PropTypes.object,
//   update: PropTypes.func,
//   remove: PropTypes.func,
};
export default SSRNodeColumnRow;

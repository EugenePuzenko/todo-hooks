const ClearCompleted = ({ clearСompleted }) => {
  return (
    <button className="clear-completed" onClick={clearСompleted}>
      Clear completed
    </button>
  );
};

ClearCompleted.defaultProps = {
  clearСompleted: () => {},
};

export default ClearCompleted;

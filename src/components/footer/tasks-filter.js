import FooterListEl from './footer-list-el';

const TasksFilter = ({ onToggleTab, tabList, filterFunc }) => {
  return (
    <ul className="filters">
      {tabList.map((filter) => {
        return (
          <FooterListEl
            key={filter.id}
            filterText={filter.name}
            isSelected={filter.selected}
            onToggleTab={() => onToggleTab(filter.id)}
            filterFunc={filterFunc}
          />
        );
      })}
    </ul>
  );
};

export default TasksFilter;

import './Langmenu.scss';

function Langmenu({ nations }) {
  return (
    <ul className="lang-options">
      {nations.map(nation => (
        <li key={nation.id} className="lang-option">{nation.name}</li>
      ))}
    </ul>
  );
}

export default Langmenu;

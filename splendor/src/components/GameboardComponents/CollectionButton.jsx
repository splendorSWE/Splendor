export default function CollectionButton({ player, isSelected, onClick }) {
    return (
      <button
        className='collection-button'
        title={`${player} Collection`}
        style={{
          opacity: isSelected ? 1 : 0.5,
        }}
        onClick={onClick}
      >
        {player} Collection
      </button>
    );
  }
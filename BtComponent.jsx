function BtComponent({ texto, onClick }) {
  return (
    <button onClick={onClick}>
      {texto}
    </button>
  );
}

export default BtComponent;
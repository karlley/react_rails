import Task from './component/Task';

const App = () => {
  return (
    <>
      <h1>タスク一覧</h1>
      <Task name="買い物" />
      <Task name="ランニング" />
      <Task name="プログラミングの勉強" />
    </>
  );
}

export default App;
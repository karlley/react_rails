import React, { useState, useEffect } from "react";
import Task from "./components/Task";
import { Center, Box, CheckboxGroup, Text } from "@chakra-ui/react";

const App = () => {
  //初期値
  const initialTasks = [
    {
      name: "買い物",
      isDone: true,
    },
    {
      name: "ランニング",
      isDone: false,
    },
    {
      name: "プログラミングの勉強",
      isDone: false,
    },
  ];

  //タスクの状態管理用の値、更新用の関数を定義
  const [tasks, setTasks] = useState([]);

  //初回レンダリング時に初期値をセット
  useEffect(() => {
    setTasks(initialTasks);
  }, []);

  //タスクが完了の値isDoneを更新する関数
  const toggleIsDone = (index) => {
    const tasksCopy = [...tasks];
    const isDone = tasksCopy[index].isDone;
    tasksCopy[index].isDone = !isDone; //isDoneプロパティのtrue/falseを反転
    setTasks(tasksCopy); //反転した値で状態更新
  };

  return (
    <Box mt="64px">
      <Center>
        <Box>
          <Box mb="24px">
            <Text fontSize="24px" fontWeight="bold">
              タスク一覧
            </Text>
          </Box>
          <CheckboxGroup>
            {tasks.map((task, index) => {
              return (
                <Task
                  key={index}
                  index={index}
                  name={task.name}
                  isDone={task.isDone}
                  toggleIsDone={toggleIsDone}
                />
              );
            })}
          </CheckboxGroup>
        </Box>
      </Center>
    </Box>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import Task from "./components/Task";
import {
  Flex,
  Center,
  Box,
  CheckboxGroup,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

const App = () => {
  //タスクの状態管理用の値、更新用の関数を定義
  const [tasks, setTasks] = useState([]);
  //入力部の状態管理用の値、更新用の関数を定義
  const [name, setName] = useState("");

  //初期値を取得
  const fetch = async () => {
    //取得完了をawaitで待つ(非同期処理)
    const res = await axios.get("http://localhost:3010/tasks");
    //取得した値で初期値を更新
    setTasks(res.data);
  };

  //タスクを作成
  const createTask = async () => {
    await axios.post("http://localhost:3010/tasks", {
      name: name,
      is_done: false,
    });
    //タスク作成後に入力部を空にする
    setName("");
    //作成したタスクを含めて初期値を再取得
    fetch();
  };

  //初回レンダリング時に初期値をセット
  useEffect(() => {
    fetch();
  }, []);

  //タスクが完了の値isDoneを更新する関数
  const toggleIsDone = (index) => {
    const tasksCopy = [...tasks];
    const isDone = tasksCopy[index].is_done;
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
          <Flex mb="24px">
            <Input
              placeholder="タスク名を入力"
              value={name}
              //inputに入力された値でタスク名のstateを更新
              onChange={(e) => setName(e.target.value)}
            />
            <Box ml="16px">
              <Button colorScheme="teal" onClick={createTask}>
                タスクを作成
              </Button>
            </Box>
          </Flex>
          <CheckboxGroup>
            {tasks.map((task, index) => {
              return (
                <Task
                  key={index}
                  index={index}
                  name={task.name}
                  isDone={task.is_done}
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

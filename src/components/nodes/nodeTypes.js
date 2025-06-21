
import InputNode from './InputNode';
import OutputNode from './OutputNode';
import TextNode from './TextNode';
import LLMNode from './LLMNode';

export const nodeTypes = {
  input: InputNode,
  output: OutputNode,
  text: TextNode,
  llm: LLMNode,
};

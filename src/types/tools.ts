export interface Tool {
  id: string
  name: string
  description: string
  icon: string
  execute: (input: string) => Promise<string>
}
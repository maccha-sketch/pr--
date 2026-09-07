# pr-練習

Git / GitHub の PR(プルリクエスト)ワークフローを練習するための、シンプルな電卓ライブラリりです。

## 使い方

```python
from calc import add, subtract, multiply, divide

add(1, 2)       # 3
subtract(5, 2)  # 3
multiply(3, 4)  # 12
divide(10, 2)   # 5.0
```

## テストの実行

このプロジェクトは標準ライブラリの `unittest` を使っています。以下のコマンドでテストが実行できます。

```bash
python -m unittest discover tests
```

## 機能

- 四則演算(加算・減算・乗算・除算)の基本的な関数を提供
- ゼロ除算はエラーを送出します

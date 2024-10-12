export const Tube = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill={filled ? fill : "none"}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.26697 1.61845C8.47776 1.26188 8.9377 1.14371 9.29427 1.35449L10.126 1.84619L19.3731 7.15338C19.7324 7.35957 19.8564 7.81794 19.6503 8.17719C19.4441 8.53644 18.9857 8.66053 18.6264 8.45434L17.7828 7.97013L16.278 10.5675L16.2762 10.5665L13.7181 9.09467C13.3591 8.8881 12.9006 9.01169 12.694 9.37072C12.4875 9.72975 12.611 10.1883 12.9701 10.3948L15.526 11.8654L14.5646 13.525L14.5628 13.5239L10.3598 11.1057C10.0008 10.8991 9.54227 11.0227 9.3357 11.3818C9.12913 11.7408 9.25272 12.1993 9.61175 12.4059L13.8126 14.8229L12.927 16.3515L12.9252 16.3505L10.3125 14.8472C9.95348 14.6407 9.49497 14.7643 9.2884 15.1233C9.08183 15.4823 9.20542 15.9408 9.56445 16.1474L12.1751 17.6494L11.0558 19.5814C9.7158 21.8943 6.74803 22.6868 4.42709 21.3514C2.10615 20.0161 1.31093 17.0585 2.65093 14.7456L9.37268 3.14332L9.36682 3.13989L8.53093 2.64574C8.17436 2.43495 8.05618 1.97502 8.26697 1.61845Z"
        fill="#fdfdfd"
      />
      <path
        d="M20 16.9999C21.1046 16.9999 22 16.0672 22 14.9166C22 14.1967 21.217 13.2358 20.6309 12.6174C20.2839 12.2512 19.7161 12.2512 19.3691 12.6174C18.783 13.2358 18 14.1967 18 14.9166C18 16.0672 18.8954 16.9999 20 16.9999Z"
        fill="#fdfdfd"
      />
    </svg>
  );
};
